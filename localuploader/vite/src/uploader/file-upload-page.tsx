"use client";

import type React from "react";

import { JSX, useState } from "react";
import Layout from "../layout";
import { UploadSimple, X } from "@phosphor-icons/react";
// import useSWR from "swr";

// function Upload(distination: string, file: File) {
//   const { data, error, isLoading } = useSWR("/api/upload", fetcher);

//   return <></>;
//}

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FileUploadPage() {
  const [destination, setDestination] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // file upload

    alert(`File "${files && Array.from(files).toString()}" would be uploaded to "${destination}"`); // delete
  };

  return (
    <Layout>
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
                    または、ここにファイルをドラッグ＆ドロップ“
                  </p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={files?.length == 0 || !destination}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              アップロード
            </button>
            
            <UploadFileList fileList={files} setFiles={setFiles} />
          </form>
        </div>
      </div>
    </Layout>
  );
}

type UpFile = {
  id: number;
  rawFile: File | null;
}

function UploadFile({ file, deleteFile }: { file: UpFile, deleteFile: (id: number) => void }) {
  return (
    <div className="flex justify-between items-center mt-1 p-2 bg-gray-100 rounded-md">
      <div>
        <p className="text-sm font-medium">{file.rawFile?.name}</p>
        <p className="text-xs text-gray-500">
            {((file.rawFile ? file.rawFile.size : 1) / 1024).toFixed(2)} KB
        </p>
      </div>
      <X onClick={() => { deleteFile(file.id) }} />
    </div>
  );
}

function UploadFileList(
  {
    fileList,
    setFiles,
  }: {
    fileList: FileList | null,
    setFiles: React.Dispatch<React.SetStateAction<FileList | null>>,
  }
) {
  if (!fileList) {
    return <></>;
  }

  let upFileList: UpFile[] = [];
  for (let i = 0; i < fileList?.length; i++) {
    upFileList.push({
      id: i,
      rawFile: fileList?.item(i),
    });
  }

  // event handler
  const deleteFile = (id: number) => {
    upFileList = upFileList.filter(f => f.id !== id);

    const dt = new DataTransfer();
    Array.from(upFileList).forEach((f) => {
      if (f.rawFile) {
        dt.items.add(f.rawFile);
      }
    });
    setFiles(dt.files);
  }

  const rows: JSX.Element[] = [];
  Array.from(fileList).forEach((file: File, i: number) => {
    rows.push(<UploadFile file={{ id: i, rawFile: file }} deleteFile={deleteFile} />);
  });
  return (
    <div className="space-y-2">
      <label htmlFor="" className="block text-sm font-medium">File List</label>
      <div>{rows}</div>
    </div>
  );
}