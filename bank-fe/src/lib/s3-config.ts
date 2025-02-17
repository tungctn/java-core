"use client";
import AWS from "aws-sdk";

export const s3Config = {
  bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "echoeslab.space",
  region: process.env.NEXT_PUBLIC_AWS_REGION || "ap-southeast-1",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
};
export const CDN_URL = `https://d25pyf4t1a8ijd.cloudfront.net`;
export const s3 =
  typeof window !== "undefined"
    ? new AWS.S3({
        region: s3Config.region,
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      })
    : null;

type FileType = "image" | "document" | "video";

export const getFileType = (mimeType: string): FileType => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  return "document";
};

export const generatePath = (fileType: FileType, fileName: string) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${fileType}s/${year}/${month}/${day}/${Date.now()}-${fileName}`;
};
