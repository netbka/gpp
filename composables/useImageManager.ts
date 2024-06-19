import defaultImage from "~/public/defaultCover-transparent.png";
import errorImage from "/exerciseSmall.png";
//import { type FileObject, type StorageError } from "@supabase/storage-js";
import { timestamp } from "@vueuse/core";
export function useImageManager(store) {
  const preview = ref(defaultImage);
  //const supabase = useSupabaseClient();
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

  const uploadImageUsingStorage = async (fileToUpload: File): Promise<{ error?: any; data?: any }> => {
    return await uploadImage(fileToUpload, store.currentItem.user_id, store.$id);
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
  const getImageUrl = (fileName: string, storage: string, addTimestamp: boolean): string => {
    const { data } = supabase.storage.from(storage).getPublicUrl(fileName);
    const timestamp = addTimestamp === true ? "?" + new Date().getTime() : "";

    return data.publicUrl + timestamp;
  };
  const deleteFile = async (
    fileName: string,
    storage: string
  ): Promise<
    | {
        data: FileObject[];
        error: null;
      }
    | {
        data: null;
        error: StorageError;
      }
  > => {
    return await supabase.storage.from(storage).remove([fileName]);
  };
  const deleteFileUsingStorage = async (
    fileName: string
  ): Promise<
    | {
        data: FileObject[];
        error: null;
      }
    | {
        data: null;
        error: StorageError;
      }
  > => {
    return await supabase.storage.from(store.$id).remove([fileName]);
  };
  const getImageUsingStore = (storage: string): void => {
    const image = store.currentItem.id;
    preview.value = getImageUrl(image, storage);
  };
  const getImageById = (storage: string, id: string): void => {
    const image = id;
    preview.value = getImageUrl(image, storage);
  };
  const getAvatar = async (): Promise<string> => {
    //const supabase = useSupabaseClient();
    const { data } = supabase.storage.from(store.$id).getPublicUrl(store.currentItem.user_id);
    const result = (await isImageAvailable(data.publicUrl)) ? data.publicUrl + "?" + new Date().getTime() : "https://eu.ui-avatars.com/api/?name=" + store.currentItem.name + "&size=100";
    return result;
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
  const isImageAvailable = async (url: string) => {
    return await fetch(url, {
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
  return {
    uploadImageUsingStorage,
    isImageAvailable,
    getAvatar,
    deleteFile,
    deleteFileUsingStorage,
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

export const getImageFromStorage = (storage: string, fileName: string) => {
  //const supabase = useSupabaseClient();
  try {
    return useRuntimeConfig().public.wwwwUrl + "/" + storage + "/" + fileName + ".gif";
  } catch (error) {
    return null;
  }
};

// export const updateUserAvatar = async (fileToUpload: File, filename: string) => {
//   const supabase = useSupabaseClient();
//   let { error: uploadError, data } = await supabase.storage.from("avatars").upload(filename, fileToUpload, {
//     upsert: true,
//   });
//   if (uploadError) {
//     //throw createError;
//     notifyMsgPositive("аватар загружен. " + uploadError);
//   }
//   return filename; //not in use
// };
// export const blobToFile = (blob: Blob, fileName: string) => {
//   const file = new File([blob], fileName, { type: blob.type });
//   return file;
// };

// export const urlToFile = async (url: string | URL, filename: string) => {
//   try {
//     // const response = await fetch(url);
//     // if (!response.ok) return genericAvatar("N", filename);
//     const response = await getAvatar(url);
//     const blob = await response.blob();
//     const newFile = new File([blob], filename, { type: blob.type });
//     return newFile;
//   } catch (error) {
//     return genericAvatar("N", filename);
//   }
// };
// export const urlToBlob = async (url: string) => {
//   try {
//     // const response = await fetch(url);
//     // if (!response.ok) return genericAvatar("N", filename);
//     const response = await getAvatar(url);
//     const blob = await response.blob();

//     return blob;
//   } catch (error) {
//     return genericAvatar("N", filename);
//   }
// };

// export const getProfile = (fileName: string) => {
//   const supabase = useSupabaseClient();
//   try {
//     const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

//     return data.publicUrl;
//   } catch (error) {
//     return null;
//   }

// };

// export const getExerciseImage = (fileName: string) => {
//   const supabase = useSupabaseClient();
//   try {
//     const { data } = supabase.storage.from("exerciseTemplate").getPublicUrl(fileName);
//     return data.publicUrl + "?" + new Date().getTime();
//   } catch (error) {
//     return null;
//   }
// };

// export const updateExerciseImage = async (fileToUpload: File, filename: string) => {
//   const supabase = useSupabaseClient();
//   let { error: uploadError } = await supabase.storage.from("exerciseTemplate").upload(filename, fileToUpload, {
//     upsert: true,
//   });
//   if (uploadError) throw uploadError;

//   return filename;
// };

// export const genericAvatar = async (name: string, filename: string) => {
//   const response = await fetch("https://eu.ui-avatars.com/api/?name=" + name + "&size=48");
//   const blob = await response.blob();
//   const newFile = new File([blob], filename, { type: blob.type });
//   return newFile;
// };

// export const getAvatar = async (url: string | URL) => {
//   try {
//     return await fetch(url);
//   } catch (error) {
//     return await fetch("https://eu.ui-avatars.com/api/?name=X&size=100");
//   }
// };
