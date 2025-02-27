"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import useUpload from "@/hooks/use-upload";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { logger } from "@/lib/helper";

interface ProfileAvatarProps {
  avatar?: string;
  fullName?: string;
  onAvatarChange: (url: string) => void;
}

export function ProfileAvatar({
  avatar,
  fullName,
  onAvatarChange,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUploadFileS3 } = useUpload();
  const { t } = useTranslation();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: t("Please upload an image file."),
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: t("File size limit is 10MB."),
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await handleUploadFileS3(file);
      onAvatarChange(result?.Location);
      toast({
        title: "Success",
        description: t("Avatar updated successfully."),
      });
    } catch (error) {
      logger.error(error);
      toast({
        title: "Error",
        description: t("Avatar update failed."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-6 mb-6">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatar} />
        <AvatarFallback>{fullName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
        {t("Change Avatar")}
      </Button>
    </div>
  );
}
