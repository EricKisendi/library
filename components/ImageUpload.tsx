"use client"
import config from "@/lib/config";
import ImageKit from 'imagekit'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { title } from "process";


const { 
  env: {
      imagekit: { publicKey, privateKey, urlEndpoint},
  },
} = config;

const authenticator = async () => {
  try{
    const response = await fetch( input: `${config.env.apiEndpoint}/api/auth/imagekit`);
    if(!response.ok) {
      const errorText = await response.text();

      throw new Error(
        message: `Request failed with status ${response.status}: ${errorText}`
      )
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature }

  } catch (error: any) {
    throw new Error(message: `Authentication request failed: ${error.message}`)
  }
}

const ImageUpload = ({ 
  onFileChange 
}: {
  onFileChange: (filePath: string) => void;
}) => {

  const ikUploadRef = useRef(initialValue: null);
  const [file, setFile] = useState<{ filePath: string } | null >(initialState: null)

  const onError = (error: any) => {
    console.log(error)

    toast ({... props}:{
      title: "Image upload failed!",
      description: `Your image could not be uploaded. Please try again  &{res.filePath}`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast ({... props}:{
      title: "Image uploaded successfully",
      description: `&{res.filePath} uploaded!`
    });
  };

  return (<ImageKitProvider 
    publicKey={publicKey}
    urlEndpoint={urlEndpoint}
    authenticator={authenticator}
  >
    <IKUpload 
      className="hidden" 
      ref={ikUploadRef} 
      onError={onError}
      onSuccess={onSuccess}
      fileName='test-upload.png'    
    />

    <button className="upload-btn" onClick = {(e) => {
      e.preventDefault();
      if(ikUploadRef.current) {
        ikUploadRef.current?.click();
      }
    }}>
      <Image 
        src="/icons/upload.svg"
        alt="upload"
        width={20}
        height={20}
        className="object-contain"
      />

      <p className="text-base text-light-100">Upload a File</p>

      {file && <p className="upload-filename">{file.filePath}</p>}
    </button>

    {file && (
      <IKImage 
        alt={file.filePath}
        path={file.filePath}
        width={500}
        height={300}
      />
    )}
  </ImageKitProvider>
  );
}

export default ImageUpload