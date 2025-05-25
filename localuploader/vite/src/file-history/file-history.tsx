"use client";

import type React from "react";
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

const useFileHistory = () => {
  const [log, setLog] = useState<JSON>();

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadHistory");
    if (storedFiles) {
      setLog(JSON.parse(storedFiles));
    }
  }, []);
};

export default function FileHistory() {
  return (
    <div className="bg-background flex-1 p-6">
      <div className="flex item-center flex-col gap-2 mb-6 max-w-2xl mx-auto">
        {/* File History */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">File History</h1>
          <p className="text-sm text-gray-500">
            Here are the files you have succecally uploaded.
          </p>
        </div>
        <ol className="relative border-s-2 border-gray-200 dark:border-gray-700 mb-10">
          <li className="flex flex-col gap-2 ps-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-900">
              <GitCommit />
            </span>
            <div>
              <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on January 13th, 2022
                <Latest />
              </time>
            </div>
            <div className="flex flex-row grow mb-1">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Flowbite Application UI v2.0.0
                </h3>
                <ul className="text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>file1.txt</li>
                  <li>file2.txt</li>
                  <li>file3.txt</li>
                </ul>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Latest() {
  return (
    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
      Latest
    </span>
  );
}
