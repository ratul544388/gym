"use client";

import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { MemberPhoto } from "./member-photo";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  pronoun: string;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  return (
    <div className="relative w-[200px] aspect-square h-fit sm:w-full sm:h-full border-[1.5px] border-dashed rounded-lg mx-auto flex items-center justify-center">
      {value ? (
        <>
          <MemberPhoto image={value} />
          <Button
            onClick={() => onChange("")}
            className="h-8 w-8 rounded-full absolute right-0.5 top-0.5"
            size="icon"
            type="button"
            variant="ghost"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </>
      ) : (
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: "ut-uploading: bg-primary after:bg-white/50",
          }}
          content={{
            button: "📸 Photo",
          }}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
          }}
          onUploadError={() => {
            toast.error("Error while uploading image");
          }}
        />
      )}
    </div>
  );
};
