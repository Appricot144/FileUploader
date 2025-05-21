"use client";

import type React from "react";

import { useEffect, useState } from "react";

export default function FileHistory() {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, []);

  return (
    <div>
      <h1>File History</h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
