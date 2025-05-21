import { FileArrowUp } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="bg-background border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex items-center gap-2">
        <FileArrowUp size={32} className="h-6 w-6" />
        <h2 className="text-xl font-bold">File Uploader</h2>
      </div>
    </header>
  );
}
