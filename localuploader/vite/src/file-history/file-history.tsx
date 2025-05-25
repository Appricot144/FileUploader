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
        <h1 className="text-2xl font-bold mb-6">File History</h1>
        <ol className="relative border-s-2 border-gray-200 dark:border-gray-700">
          <li className="mb-10 ms-6">
            <div className="flex flex-col gap-2">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <GitCommit />
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Flowbite Application UI v2.0.0{" "}
                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Latest
                </span>
              </h3>
            </div>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on January 13th, 2022
            </time>
            <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>file1.txt</li>
              <li>file2.txt</li>
              <li>file3.txt</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}
