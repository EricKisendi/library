"use client";

import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useRef, useState } from "react";

import Image from "next/image";
import config from "@/lib/config";
import { toast } from "sonner";

const { 
  env: {
      imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {

    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };

  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
   onFileChange 
  }: { 
    onFileChange: (filePath: string) => void 
  }) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Upload Error:", error);

    toast("Image upload failed!", {
      description: "Your image could not be uploaded. Please try again.",
      className: "bg-red-500 text-white",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast("Image uploaded successfully!", {
      description: `${res.filePath} uploaded!`,
      className: "bg-green-500 text-white",
    });
  };

  return (
    <ImageKitProvider 
      publicKey={publicKey} 
      urlEndpoint={urlEndpoint} 
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn flex items-center space-x-2"
        onClick={(e) => {
          e.preventDefault();
          ikUploadRef.current?.click();
        }}
      >

        <Image 
          src="/icons/upload.svg" 
          alt="upload" 
          width={20} 
          height={20} 
          className="object-contain" 
        />

        <p className="text-base text-light-100">Upload a File</p>
      </button>

      {file && 
        <p className="upload-filename">{file.filePath}</p>
      }

      {file && 
        <IKImage 
          alt={file.filePath} 
          path={file.filePath} 
          width={500} 
          height={300} 
        />}

    </ImageKitProvider>
  );
};

export default ImageUpload;
