import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

const salvaImagem = async (base64: string, folder: string, nome: string) => {
  try {
    return await cloudinary.uploader.upload(base64, {
      public_id: "EXEMPLAR-" + nome,
      folder,
      resource_type: "image",
    });
  } catch (error) {
    console.error("Erro ao salvar imagem no Cloudinary:", error);
    throw new Error("Erro ao salvar imagem no Cloudinary");
  }
};

export const cloudnaryWrapper = { salvaImagem };
