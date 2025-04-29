"use client";

import { useState } from "react";
import {
  House,
  UploadSimple,
  Files,
  Gear,
  X,
  List,
} from "@phosphor-icons/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: House, label: "ホーム", href: "#" },
    { icon: UploadSimple, label: "アップロード", href: "#", active: true },
    { icon: Files, label: "ファイル履歴", href: "#" },
    { icon: Gear, label: "設定", href: "#" },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <List />}
      </button>

      <aside
        className={`bg-white border-r border-gray-200 w-64 shrink-0 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40`}
      >
        <div className="p-4 space-y-6">
          <div className="h-12 flex items-center px-2">
            <span className="text-lg font-semibold">メニュー</span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index: number) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  item.active
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
