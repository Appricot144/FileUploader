"use client";

import type React from "react";

import { useState } from "react";
import UploadFileList from "./filelist";
import { UploadSimple } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

async function uploadFiles(
  url: string,
  { arg }: { arg: { files: FileList; destination: string } }
) {
  // file upload ってformData使う必要ある...?
  const formData = new FormData();
  formData.append("destination", arg.destination);
  for (let i = 0; i < arg.files?.length; i++) {
    const f = arg.files.item(i);
    if (f) {
      formData.append(f.name, new Blob([f], { type: f.type }));
    }
  }

  await fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export default function FileUploadPage() {
  const { trigger, isMutating } = useSWRMutation("http://localhost:8088/api/upload", uploadFiles);

  const [destination, setDestination] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    } else {
      setFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = () => {
    // file upload
    if (files) {
      trigger({ files, destination });
    } 

    // fix me
    if (isMutating) toast.loading("Waiting...");
    toast.success("Successfully uploaded!");
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex item-center gap-2 mb-6">
          <h1 className="text-2xl font-bold">File Upload</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="destination"
              className="block text-sm font-medium"
            >
              Destination
            </label>
            <input
              id="destination"
              type="text"
              placeholder="/path/to/destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium">
              File
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                id="file"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <UploadSimple className="h-10 w-10 text-gray-400" />
                <label
                  htmlFor="file"
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  ファイルを選択
                </label>
                <p className="text-sm text-gray-500">
                  または、ここにファイルをドラッグ＆ドロップ
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!files || !destination || files.length == 0 || isMutating}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            アップロード
          </button>

          <UploadFileList fileList={files} setFiles={setFiles} />
        </form>
      </div>
    </div>
  );
}