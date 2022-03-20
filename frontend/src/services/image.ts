import { api } from "./api";

export const uploadFile = async (
  file: File,
  url: string,
): Promise<{ errorMessage?: string; uploadedFilename?: string }> => {
  if (!file) {
    return {
      errorMessage: "Erreur lors de l'upload du fichier",
    };
  }
  const fileExtension = file.name.split(".").pop();

  // on vérifie qu'on upload une image ou un fichier PDF
  if (!["jpg", "png", "jpeg", "PNG"].includes(fileExtension!)) {
    return {
      errorMessage:
        "Ce type de fichier ne peut pas être déposé, veuillez choisir une image",
    };
  }

  const headersContent = {
    "Content-Type": file.type,
    Accept: "application/json",
  };
  const headers = new Headers(headersContent);

  let response;
  try {
    response = await fetch(url, {
      method: "PUT",
      body: file,
      headers,
    });
  } catch (e) {
    return {
      errorMessage:
        "Une erreur s'est produite durant le dépôt du fichier, veuillez réessayer.",
    };
  }

  let uploadedFilename = response?.url ?? "";

  const bucketsUrl = ["https://digitalrb-regions.s3.eu-west-3.amazonaws.com/"];

  bucketsUrl.forEach(url => {
    uploadedFilename = uploadedFilename.split("?")[0].replace(url, "");
  });

  if (!uploadedFilename) {
    return {
      errorMessage:
        "Une erreur s'est produite durant le dépôt du fichier, veuillez réessayer.",
    };
  }

  return { uploadedFilename: uploadedFilename };
};

export const getS3Url = async () => {
  const res = await api.get(`/s3/url`);

  if (!res.data.url) {
    return {
      url: "",
      errorMessage:
        "Une erreur s'est produite durant le dépôt du fichier, veuillez réessayer.",
    };
  }
  return { url: res.data.url, errorMessage: "" };
};
