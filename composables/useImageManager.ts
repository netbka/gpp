import defaultImage from "~/public/defaultCover-transparent.png";
import errorImage from "/exerciseSmall.png";

//import { type FileObject, type StorageError } from "@supabase/storage-js";
import { fetch, refreshToken, shouldRefreshToken } from "../composables/api.js";
export function useImageManager(store) {
  const preview = ref(defaultImage);
  //const supabase = useSupabaseClient();
  const urlToBlob = async (url: string): Promise<Blob> => {
    try {
      let imageData = new Blob();
      return await $fetch(url).then((response) => {
        return response;
      });
    } catch (error) {
      console.log("urlToBlob error", error);
      return imageData;
    }
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
    return await uploadImage(fileToUpload, store.currentItem.id, store.$id);
  };
  const uploadImage = async (fileToUpload: File, fileName: string, storage: string): Promise<{ data?: any }> => {
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("store", storage);
      formData.append("fileName", fileName);
      const uploadResponse = await fetch("/api/" + storage + "/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadResponse.success) {
        notifyMsgPositive("Файл загружен");
      } else {
        notifyMsgNegative("Файл не загружен. " + uploadResponse.statusText);
      }

      return uploadResponse;
    } catch (error) {
      return null;
    }
  };
  const getImageUrl = (fileName: string, storage: string, addTimestamp: boolean): string => {
    const data = useRuntimeConfig().public.baseUrl + "/" + storage + "/" + fileName + ".gif";
    //supabase.storage.from(storage).getPublicUrl(fileName);
    const timestamp = addTimestamp === true ? "?" + new Date().getTime() : "";
    //console.log(await isImageAvailable(data));
    return data + timestamp;
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
    preview.value = getImageUrl(image, storage, false);
  };
  const getImageById = (storage: string, id: string): void => {
    const image = id;
    preview.value = getImageUrl(image, storage, false);
  };
  const getAvatar = async (): Promise<string> => {
    const data = useRuntimeConfig().public.baseUrl + "/" + store.$id + "/" + store.currentItem.id + ".gif";
    const defaultavatar = useRuntimeConfig().public.baseUrl + "/" + store.$id + "/defaultavatar.png";
    const result = (await isImageAvailable(data)) ? data + "?" + new Date().getTime() : defaultavatar;
    return result;
  };

  const getExternalAvatar = (name: string): string => {
    return "https://eu.ui-avatars.com/api/?name=" + name + "&size=100";
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
    try {
      return await $fetch(url, {
        method: "HEAD",
      })
        .then((response) => {
          return true;
        })
        .catch((error) => {
          //console.error("Error checking file existence:", error);
          return false;
        });
    } catch (err) {
      return false;
    }
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
    return useRuntimeConfig().public.baseUrl + "/" + storage + "/" + fileName + ".gif";
  } catch (error) {
    return null;
  }
};
