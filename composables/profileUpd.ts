// export default async (url: string | URL, filename: string) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const newFile = new File([blob], filename, { type: blob.type });
//   return newFile;
// };

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

export const getProfile = async (fileName: string) => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.storage.from("avatars").getPublicUrl(fileName);
  //if (error) return "https://eu.ui-avatars.com/api/?name=" + firstName + "+" + lastName + "&size=48";
  //console.log(data);
  if (error) throw nodataError;
  return data.publicUrl;
};

export const updateUserAvatar = async (fileToUpload: File, filename: string) => {
  const supabase = useSupabaseClient();
  let { error: uploadError } = await supabase.storage.from("avatars").upload(filename, fileToUpload, {
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
