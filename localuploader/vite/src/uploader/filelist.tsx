"use clients";

import { X } from "@phosphor-icons/react";
import { JSX } from "react";

type UpFile = {
  id: number;
  rawFile: File | null;
};

function UploadFile({
  file,
  onDeleteFile,
}: {
  file: UpFile;
  onDeleteFile: (id: number) => void;
}) {
  return (
    <div className="flex justify-between items-center mt-1 p-2 bg-gray-100 rounded-md">
      <div>
        <p className="text-sm font-medium">{file.rawFile?.name}</p>
        <p className="text-xs text-gray-500">
          {((file.rawFile ? file.rawFile.size : 1) / 1024).toFixed(2)} KB
        </p>
      </div>
      <X
        onClick={() => {
          onDeleteFile(file.id);
        }}
      />
    </div>
  );
}

export default function UploadFileList({
  fileList,
  setFiles,
}: {
  fileList: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}) {
  let upFileList: UpFile[] = [];
  if (fileList) {
    for (let i = 0; i < fileList?.length; i++) {
      upFileList.push({
        id: i,
        rawFile: fileList?.item(i),
      });
    }
  }

  // event handler
  const deleteFile = (id: number) => {
    upFileList = upFileList.filter((f) => f.id !== id);

    const dt = new DataTransfer();
    Array.from(upFileList).forEach((f) => {
      if (f.rawFile) {
        dt.items.add(f.rawFile);
      }
    });
    setFiles(dt.files);
  };

  const rows: JSX.Element[] = [];
  upFileList.forEach((file: UpFile) => {
    rows.push(<UploadFile file={file} onDeleteFile={deleteFile} />);
  });
  return (
    <div className="space-y-2">
      <label htmlFor="" className="block text-sm font-medium">
        File List
      </label>
      <div>{rows}</div>
    </div>
  );
}
