"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "@/store/store";
import Loader from "./loader";
import { cn } from "@/utils/cn";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function ImageUpload({
  setValue,
  errors,
  imageValue,
}: {
  setValue?: any;
  errors: any;
  imageValue?: string | null;
}) {
  const { user, closeModal, isOpen } = useBoundStore();
  const [uploadedUrl, setUploadedUrl] = useState<string | null | undefined>(
    imageValue
  );
  const supabase = createClient();
  const [state, setState] = useState<
    "uploading" | "error" | "success" | "idle"
  >("idle");

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // File size check: 10 MB (10,485,760 bytes)
    const MAX_FILE_SIZE = 10_485_760;
    if (file.size > MAX_FILE_SIZE) {
      // alert("File size exceeds the 10 MB limit. Please upload a smaller file.");
      setState("error");
      return;
    }

    setState("uploading");
    const uniqueId = uuidv4();

    try {
      // Upload the raw file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images") // Replace with your bucket name
        .upload(`public/${uniqueId}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        setState("error");
        throw error;
      }

      // Generate the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(data.path);
      setState("success");
      setUploadedUrl(publicUrl); // Save the public URL
      setValue("image_url", publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      setState("error");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFileUpload(file!);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    handleFileUpload(file!);
  };

  useEffect(() => {
    if (!isOpen) {
      setUploadedUrl(null);
    }
    setState("idle");
  }, [uploadedUrl, closeModal, isOpen]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="mt-6 h-fit max-sm:mx-2 ">
      <div className="flex items-center justify-center w-full relative overflow-hidden">
        <label
          htmlFor="dropzone-file"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center w-full h-[10rem] md:h-64 border-2 border-[#ffa270] border-dashed rounded-xl md:rounded-3xl cursor-pointer bg-[#fff4ed] hover:bg-[#ffe6d4] relative overflow-hidden",
            { " bg-transparent": uploadedUrl }
          )}
        >
          {uploadedUrl ? (
            <div className="w-full h-full overflow-hidden absolute flex items-center justify-center">
              <p className="text-green-500 font-sans text-sm">
                Uploaded Successfully!
              </p>
              <Image
                src={uploadedUrl}
                fill
                className="object-cover relative z-10"
                alt="user uploaded image"
              />
            </div>
          ) : (
            <>
              {state === "uploading" ? (
                <div className="flex items-center justify-between">
                  <Loader />
                  <p className="text-[#ff5722] font-sans">Uploading</p>
                </div>
              ) : state === "error" ? (
                <div className="flex items-center justify-between">
                  <p className="font-sans text-red-500 text-center">
                    Something went wrong.
                    <br />
                    Please try again
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-[#ff5722] "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-[#ff5722]">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-[#ff5722] ">
                    PNG, JPG or (MAX. 10MB)
                  </p>
                </div>
              )}
              {state !== "uploading" && state !== "success" && (
                <input
                  id="dropzone-file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              )}
            </>
          )}
        </label>
      </div>
      {errors.image_url && (
        <p className="text--sm font-sans text-red-500 my-2">
          {errors.image_url.message}
        </p>
      )}
    </div>
  );
}
