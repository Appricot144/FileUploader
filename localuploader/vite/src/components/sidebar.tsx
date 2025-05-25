"use client";

import { useState } from "react";
import {
  House,
  UploadSimple,
  Files,
  Gear,
  X,
  List,
  Icon,
} from "@phosphor-icons/react";

type MenuItem = {
  icon: Icon;
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { icon: House, label: "ホーム", href: "/home" },
  { icon: UploadSimple, label: "アップロード", href: "/" },
  { icon: Files, label: "ファイル履歴", href: "/history" },
  { icon: Gear, label: "設定", href: "/setting" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <List />}
      </button>

      <aside
        className={`bg-white dark:bg-black border-r border-gray-200 w-64 shrink-0 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40`}
      >
        <div className="p-4 space-y-6">
          <div className="h-12 flex items-center px-2">
            <span className="text-lg font-semibold">メニュー</span>
          </div>

          <MenuList menuItems={menuItems} />
        </div>
      </aside>
    </>
  );
}

function MenuList({ menuItems }: { menuItems: MenuItem[] }) {
  const currentPath = getParentPathname();
  return (
    <ul className="space-y-1">
      {menuItems.map((item, index: number) => (
        <li key={index}>
          <Menu item={item} isActive={currentPath === item.href} />
        </li>
      ))}
    </ul>
  );
}

function Menu({ item, isActive }: { item: MenuItem; isActive: boolean }) {
  return (
    <a
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        isActive
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.label}</span>
    </a>
  );
}

function getParentPathname(): string {
  const head = location.pathname.split("/").find((e) => e.length !== 0);
  return head ? "/" + head : "/";
}
