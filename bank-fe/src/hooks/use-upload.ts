"use client";
import {
  CDN_URL,
  generatePath,
  getFileType,
  s3,
  s3Config,
} from "@/lib/s3-config";

export default function useUpload() {
  const handleUploadFileS3 = async (file: File) => {
    const params = {
      Bucket: s3Config.bucketName,
      Key: generatePath(getFileType(file?.type || ""), file?.name || ""),
      Body: file,
      ContentType: file?.type || "",
    };

    try {
      const result = await s3?.upload(params).promise();
      return {
        ...result,
        Location: `${CDN_URL}/${result?.Key}`,
      };
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  };

  return { handleUploadFileS3 };
}
