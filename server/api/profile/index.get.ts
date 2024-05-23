import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
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
    var model = { firstName: user_id.split("-")[0], lastName: "", user_id: user_id, name: "" };
    model.firstName = event.context.user.email.split("@")[0];

    //if not result then create a new profile
    if (result === null) {
      if (event.context.user.user_metadata.name) {
        model.name = event.context.user.user_metadata;
        var fullName = event.context.user.user_metadata.name.split(" ");

        if (fullName.length > 0) {
          model.firstName = fullName[0];
          if (fullName.length > 1) {
            model.lastName = fullName[1];
          }
        }
      }

      result = await prisma.profile.create({
        data: model,
        include: {
          profilesSportType: true,
        },
      });
    }

    // let hasProfile = await hasProfileImage(result.user_id);
    // if (!hasProfile) {
    //   var avatarInitials = isEmptyString(result.name) ? result.firstName : result.name;
    //   await initAvatar(event.context.user.user_metadata.avatar_url, result.user_id, avatarInitials);
    // }
    return result;
  } catch (error) {
    console.log("error from server", error);
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
  } finally {
    prisma.$disconnect();
  }
});
import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";
const supabaseUrl = useRuntimeConfig().public.supabase.url;
const supabaseKey = useRuntimeConfig().public.supabase.key;
const supabase = createClient(supabaseUrl, supabaseKey);
const initAvatar = async (url: string, fileName: string, name: string) => {
  const fileToUpload = await urlFile(url, fileName, name);
  let { error } = await supabase.storage.from("avatars").upload(fileName, fileToUpload, {
    upsert: true,
  });

  return error === null ? fileName : null; //return false if ok
};

const hasProfileImage = async (fileName: string): Promise<boolean> => {
  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return await fetch(data.publicUrl, {
    method: "HEAD",
  })
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error checking file existence:", error);
      return false;
    });
};

const getAvatarFromUrl = async (url: string, name: string) => {
  try {
    return await fetch(url);
  } catch (error) {
    return await fetch("https://eu.ui-avatars.com/api/?name=" + name.charAt(0) + "&size=100");
  }
};

const urlFile = async (url: string, fileName: string, name: string) => {
  const response = await getAvatarFromUrl(url, name);

  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};

function isEmptyString(str) {
  return str?.length === 0;
}
