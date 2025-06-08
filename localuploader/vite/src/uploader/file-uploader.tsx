"use client";

import type React from "react";

import { useState } from "react";
import UploadFileList from "./filelist";
import { FILE_HISTORY_STORAGE_KEY } from "../history/file-history";
import { UploadSimple } from "@phosphor-icons/react";
import toast, { Toaster } from "react-hot-toast";
import useSWRMutation from "swr/mutation";

type UploadArgs = {
  destination: string;
  files: FileList;
};

async function uploadFiles(url: string, { arg }: { arg: UploadArgs }) {
  const formData = new FormData();
  formData.append("destination", arg.destination);
  for (let i = 0; i < arg.files?.length; i++) {
    const f = arg.files.item(i);
    if (f) {
      formData.append("files", new Blob([f], { type: f.type }), f.name);
    }
  }

  const response: Response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

interface HistoryElement {
  uploadDate: string;
  destination: string;
  file: FileInfo;
}
interface FileInfo {
  name: string;
  type: string;
  size: number;
}

const STORE_LIMIT_DAYS = 30;

function storeHistory(args: UploadArgs) {
  const existingHistory = localStorage.getItem(FILE_HISTORY_STORAGE_KEY);
  let uploadedFiles: HistoryElement[] = existingHistory
    ? JSON.parse(existingHistory)
    : [];
  // create json
  const json = {
    uploadDate: new Date().toISOString(),
    destination: args.destination,
    files: Array.from(args.files).map((file: File) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    })),
  };
  // delete history 30 days before
  uploadedFiles = Array.from(uploadedFiles).filter((e) => {
    const uploadDate = new Date(e.uploadDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(new Date().getDate() - STORE_LIMIT_DAYS);
    return uploadDate > thirtyDaysAgo;
  });

  // store args to local storage
  localStorage.setItem(
    "uploadHistory",
    JSON.stringify([...uploadedFiles, json])
  );
}

export default function FileUploadPage() {
  return (
    <div className="bg-background p-6">
      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex item-center gap-2 mb-6">
          <h1 className="text-2xl font-bold">File Upload</h1>
        </div>
        <FileUploadForm />
      </div>
    </div>
  );
}

function FileUploadForm() {
  const [destination, setDestination] = useState("");
  const {
    files,
    setFiles,
    isDragging,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDragAndDrop();
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:8087/api/upload",
    uploadFiles
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || !destination) return;

    try {
      await trigger({ files, destination });
      toast.success("アップロードが完了しました！");
      storeHistory({ files, destination });
      // clear file input
      setFiles(null);
      const fileInput = document.getElementById("file") as HTMLInputElement;
      fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`アップロードに失敗しました: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="" className="block text-sm font-medium">
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
  );
}

const useDragAndDrop = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  return {
    files,
    setFiles,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
