"use client";

import { GitCommit } from "@phosphor-icons/react";

import { useEffect, useState } from "react";

/** data structure
 *{
    uploadDate: "yyyy-mm-dd hh:hh",
    destination: "path",
    files: [
      {
        name: "file.name",
        type: "file.type",
        size: "file.size",
      }
    ],
  };
 */

type FileInfo = {
  name: string;
  type: string;
  size: string;
};

type HistoryItem = {
  uploadDate: string;
  destination: string;
  files: FileInfo[];
};

export const FILE_HISTORY_STORAGE_KEY = "uploadHistory";

// const ERROR_MESSAGES = {
//   INVALID_DATA: "無効なデータ形式です",
//   STORAGE_ERROR: "ローカルストレージの読み取りに失敗しました",
// } as const;

const useFileHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  // const [error, isError] = useState<string | null>(null);

  useEffect(() => {
    const historyJson = localStorage.getItem(FILE_HISTORY_STORAGE_KEY);
    if (historyJson) {
      setHistory(JSON.parse(historyJson));
    }
  }, []);

  return {
    history,
  };
};

export default function FileHistoryPage() {
  return (
    <div className="bg-background flex-1 p-6">
      <div className="flex item-center flex-col gap-2 mb-6 max-w-2xl mx-auto">
        {/* File History */}
        <div className="pb-2 mb-6 border-b-1 border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-2">File History</h1>
          <p className="text-sm text-gray-500">
            Here are the files you have succecally uploaded.
          </p>
        </div>
        <LogList />
      </div>
    </div>
  );
}

function LogList() {
  const { history } = useFileHistory();

  const dummyFile: FileInfo = {
    name: "dummy.file",
    type: "file",
    size: "100.0",
  };

  if (!history || history.length === 0) {
    return (
      <ol className="relative border-s-2 border-gray-200 dark:border-gray-700 mb-10">
        <Log
          isLatest={true}
          item={{
            uploadDate: "1970-01-01 00:00:00",
            destination: "/No_files/have/been/uploaded/yet",
            files: [dummyFile],
          }}
        />
      </ol>
    );
  }

  return (
    <ol className="relative border-s-2 border-gray-200 dark:border-gray-700 mb-10">
      {history
        .sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        )
        .map((item, index) => (
          <Log key={index} isLatest={index === 0} item={item} />
        ))}
    </ol>
  );
}

function Latest() {
  return (
    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
      Latest
    </span>
  );
}

function Log({ isLatest, item }: { isLatest: boolean; item: HistoryItem }) {
  return (
    <li className="flex flex-col gap-2 ps-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-6 ring-white dark:ring-gray-900 dark:bg-gray-900">
        <GitCommit size={16} />
      </span>
      <div>
        <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          Uploaded on{" "}
          {new Date(item.uploadDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "Asia/Tokyo",
          })}
          {isLatest ? <Latest /> : <></>}
        </time>
      </div>
      <div className="flex flex-col grow group p-2 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.destination}
        </h3>
        <ul className="text-base font-normal text-gray-500 dark:text-gray-400">
          {item.files.map((file, index) => (
            <li key={index} className="flex justify-between">
              <span>{file.name}</span>
              <span>{(parseInt(file.size) / 1024).toFixed(2)}KB</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
