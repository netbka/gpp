import { getAvatar } from "./../../../composables/profileUpd";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const parserUserId = (event) => {
//   try {
//     const {
//       user: { id: user_id },
//     } = event.context;
//     return user_id;
//   } catch (error) {
//     return null;
//   }
// };

export default defineEventHandler(async (event) => {
  // if (parserUserId(event) === null) {
  //   console.log("not parsed");
  //   return;
  // }

  //const user_id = parserUserId(event);
  //if (event.context.user === null) return null;
  try {
    const {
      user: { id: user_id },
    } = event.context;

    var result = await prisma.profile.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        profilesSportType: true,
      },
    });
    var model = { firstName: user_id.split("-")[0], lastName: user_id.split("-")[1], user_id: user_id };

    if (result === null) {
      var fullName = event.context.user.user_metadata.name.split(" ");

      if (fullName.length > 0) {
        model.firstName = fullName[0];
        if (fullName.length > 1) {
          model.lastName = fullName[1];
        }
      }

      result = await prisma.profile.create({
        data: model,
        include: {
          profilesSportType: true,
        },
      });
    }

    if (result.avatarPath === undefined || (result.avatarPath !== undefined && result.avatarPath?.length < 3)) {
      var uploadResult = await initAvatar(event.context.user.user_metadata.avatar_url, result.user_id);

      if (uploadResult) {
        result = await prisma.profile.update({
          where: {
            user_id: user_id,
          },
          data: {
            avatarPath: uploadResult,
          },
          include: {
            profilesSportType: true,
          },
        });
      }
    }
  } catch (error) {
    console.log("error from server", error);
    return null;
  } finally {
    prisma.$disconnect();
    return result;
  }
});
import { createClient } from "@supabase/supabase-js";
const initAvatar = async (url: string, fileName: string) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const fileToUpload = await urlFile(url, fileName);
  //console.log(fileToUpload);
  //const fileExt = getFileExtension(fileToUpload.type);
  //fileName = fileName + "." + fileExt;
  let { error } = await supabase.storage.from("avatars").upload(fileName, fileToUpload, {
    upsert: true,
  });

  return error === null ? fileName : null; //return false if ok
};

const getAvatarFromUrl = async (url) => {
  try {
    return await fetch(url);
  } catch (error) {
    return await fetch("https://eu.ui-avatars.com/api/?name=X&size=100");
  }
};

const urlFile = async (url: string, fileName: string) => {
  const response = await getAvatarFromUrl(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};

// const getFileExtension = (mimeType) => {
//   //const mimeType = blob.type;
//   const mimeTypeParts = mimeType.split("/");
//   const fileExtension = mimeTypeParts[mimeTypeParts.length - 1];
//   return fileExtension;
// };
