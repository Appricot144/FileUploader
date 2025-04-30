"use client";

import type React from "react";

import { useState } from "react";
import Layout from "../layout";
import { UploadSimple } from "@phosphor-icons/react";
import useSWR from "swr";

function Upload(distination: string, file: File) {
  const { data, error, isLoading } = useSWR("/api/upload", fetcher);

  return <></>;
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FileUploadPage() {
  // TODO read code
  const [destination, setDestination] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // file upload

    alert(`File "${file?.name}" would be uploaded to "${destination}"`); // delete
  };

  return (
    <Layout>
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">File Upload</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="destination"
                className="block text-sm font-medium"
              >
                保存先
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
                ファイル
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
                {file && (
                  <div className="mt-4 p-2 bg-gray-100 rounded-md">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!file || !destination}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              アップロード
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
