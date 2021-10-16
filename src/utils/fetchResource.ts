import { BlogSlug } from "../types/blogTypes";
import { FilesData, UploadResponse } from "../types/globalTypes";
import { getUri } from "./resolvePort";

export const uploadImages = async (files: FilesData[]) => {
  let promises: Promise<Response>[] = [];

  files.forEach((file) => {
    const image = file.file;
    const formData = new FormData();
    formData.append("image", image, image.name);
    const promise = fetch(`${getUri()}/api/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    promises.push(promise);
  });

  const response = await Promise.all(promises);

  if (!response[0].ok) {
    throw new Error("error uploading images");
  }

  promises = [];

  response.forEach((res) => {
    const promise = res.json();
    promises.push(promise);
  });

  const data = (await Promise.all(promises)) as unknown as UploadResponse[];

  return data;
};

export const publishBlog = async (obj: BlogSlug) => {
  const response = await fetch(`${getUri()}/api/publish`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ data: obj }),
  });
  if (!response.ok) {
    throw new Error("publish failed");
  }
};
