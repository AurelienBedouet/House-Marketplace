import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (
  userId: string,
  image: File,
  path: string
) => {
  const storage = getStorage();
  const fileName = `${userId}-${image.name}-${crypto.randomUUID()}`;
  const storageRef = ref(storage, path + fileName);

  const response = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(response.ref);
  return url;
};
