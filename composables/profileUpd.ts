// export default async (url: string | URL, filename: string) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const newFile = new File([blob], filename, { type: blob.type });
//   return newFile;
// };

export const blobToFile = (blob: Blob, fileName: string) => {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

export const urlToFile = async (url: string | URL, filename: string) => {
  try {
    // const response = await fetch(url);
    // if (!response.ok) return genericAvatar("N", filename);
    const response = await getAvatar(url);
    const blob = await response.blob();
    const newFile = new File([blob], filename, { type: blob.type });
    return newFile;
  } catch (error) {
    return genericAvatar("N", filename);
  }
};
export const urlToBlob = async (url: string) => {
  try {
    // const response = await fetch(url);
    // if (!response.ok) return genericAvatar("N", filename);
    const response = await getAvatar(url);
    const blob = await response.blob();

    return blob;
  } catch (error) {
    return genericAvatar("N", filename);
  }
};

export const getProfile = async (fileName: string) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    return null;
  }
  //if (error) return "https://eu.ui-avatars.com/api/?name=" + firstName + "+" + lastName + "&size=48";
  //console.log(data);
  //if (error) throw nodataError;
};

export const updateUserAvatar = async (fileToUpload: File, filename: string) => {
  const supabase = useSupabaseClient();
  let { error: uploadError, data } = await supabase.storage.from("avatars").upload(filename, fileToUpload, {
    upsert: true,
  });
  if (uploadError) throw uploadError;
  notifyMsgPositive("аватар загружен");
  return filename;
};

export const getExerciseImage = (fileName: string) => {
  const supabase = useSupabaseClient();
  //console.log(fileName);
  try {
    const { data } = supabase.storage.from("exercises").getPublicUrl(fileName);
    return data.publicUrl;
  } catch (error) {
    console.log(error);
    return null;
  }

  // //if (error) return "https://eu.ui-avatars.com/api/?name=" + firstName + "+" + lastName + "&size=48";
  // //console.log(data);
  // if (error) {
  //   console.log(error);
  // }
  // return data.publicUrl;
};

export const updateExerciseImage = async (fileToUpload: File, filename: string) => {
  const supabase = useSupabaseClient();
  let { error: uploadError } = await supabase.storage.from("exercises").upload(filename, fileToUpload, {
    upsert: true,
  });
  if (uploadError) throw uploadError;

  return filename;
};

export const genericAvatar = async (name: string, filename: string) => {
  const response = await fetch("https://eu.ui-avatars.com/api/?name=" + name + "&size=48");
  const blob = await response.blob();
  const newFile = new File([blob], filename, { type: blob.type });
  return newFile;
};

export const getAvatar = async (url: string | URL) => {
  try {
    return await fetch(url);
  } catch (error) {
    return await fetch("https://eu.ui-avatars.com/api/?name=X&size=100");
  }
};
