// export default async (url: string | URL, filename: string) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const newFile = new File([blob], filename, { type: blob.type });
//   return newFile;
// };

// export const useImageManager = (store) => ({
//   async fileToBlob(url: string | URL): Promise<Blob> {
//     const response = await fetch(url);
//     const imageData = await response.blob();
//     return imageData;
//   },
//   blobToFile(blob: Blob, fileName: string): File {
//     const file = new File([blob], fileName, { type: blob.type });
//     return file;
//   },
//   async uploadImage(fileToUpload: File, fileName: string, storage: string): Promise<void> {
//     const supabase = useSupabaseClient();
//     let { error } = await supabase.storage.from(storage).upload(fileName, fileToUpload, {
//       upsert: true,
//     });
//     if (error) notifyMsgNegative("Файл не загружен. " + error.message);
//   },
//   getImageUrl(fileName: string, storage: string): string {
//     const supabase = useSupabaseClient();
//     const { data } = supabase.storage.from(storage).getPublicUrl(fileName);
//     return data.publicUrl;
//   },
// });

// export const fileToBlob = async (url: string) => {
//   const response = await fetch(url);
//   const imageData = await response.blob();
//   return imageData;
// };
import defaultImage from "~/public/defaultCover-transparent.png";
import errorImage from "/exerciseSmall.png";
export function useImageManager(store) {
  const preview = ref(defaultImage);
  const supabase = useSupabaseClient();
  const urlToBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    const imageData = await response.blob();
    return imageData;
  };
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const blob = await urlToBlob(url);
    const file = new File([blob], filename, { type: blob.type });
    return file;
  };
  const blobToFile = (blob: Blob, fileName: string): File => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };
  const uploadImage = async (fileToUpload: File, fileName: string, storage: string): Promise<{ error?: any; data?: any }> => {
    try {
      let { error, data } = await supabase.storage.from(storage).upload(String(fileName), fileToUpload, {
        upsert: true,
      });
      if (error) notifyMsgNegative("Файл не загружен. " + error.message);
      if (data) notifyMsgPositive("Файл загружен");
      return { error, data };
    } catch (error) {
      return { error };
    }
  };
  const getImageUrl = (fileName: string, storage: string): string => {
    const { data } = supabase.storage.from(storage).getPublicUrl(fileName);
    return data.publicUrl + "?" + new Date().getTime();
  };
  const deleteFile = async (fileName: string, storage: string): Promise<void> => {
    const { data, error } = await supabase.storage.from(storage).remove([fileName]);
  };
  const getImageUsingStore = (storage: string): void => {
    const image = store.currentItem.id;
    preview.value = getImageUrl(image, storage);
  };
  const getImageById = (storage: string, id: string): void => {
    const image = id;
    preview.value = getImageUrl(image, storage);
  };

  const handleImageChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        preview.value = event.target.result as string; // Cast to string for data URL
      };
      reader.readAsDataURL(file);
    } else {
      preview.value = defaultImage;
    }
  };
  const defaultImg = () => {
    return defaultImage;
  };
  const errorImg = () => {
    return errorImage;
  };
  return {
    deleteFile,
    getImageById,
    getImageUsingStore,
    urlToFile,
    urlToBlob,
    blobToFile,
    uploadImage,
    getImageUrl,
    defaultImg,
    errorImg,
    preview,
    handleImageChange,
  };
}

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

export const getProfile = (fileName: string) => {
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
  if (uploadError) {
    //throw createError;
    notifyMsgPositive("аватар загружен. " + uploadError);
  }
  return filename; //not in use
};

export const getImageFromStorage = (storage: string, fileName: string) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = supabase.storage.from(storage).getPublicUrl(fileName);
    return data.publicUrl; // + "?" + new Date().getTime();
  } catch (error) {
    return null;
  }
};

export const getExerciseImage = (fileName: string) => {
  const supabase = useSupabaseClient();
  try {
    const { data } = supabase.storage.from("exerciseTemplate").getPublicUrl(fileName);
    return data.publicUrl + "?" + new Date().getTime();
  } catch (error) {
    return null;
  }
};

export const updateExerciseImage = async (fileToUpload: File, filename: string) => {
  const supabase = useSupabaseClient();
  let { error: uploadError } = await supabase.storage.from("exerciseTemplate").upload(filename, fileToUpload, {
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
