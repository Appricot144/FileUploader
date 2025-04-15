"use client";

import type React from "react";

import { useState } from "react";
import Layout from "../layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function FileUploadPage() {
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
        // Here you would handle the actual file upload
        console.log("File to upload:", file);
        console.log("Destination:", destination);
        alert(`File "${file?.name}" would be uploaded to "${destination}"`);
    };

    return (
        <Layout>
            <div className="flex-1 p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">
                        ファイルアップロード
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="destination">保存先</Label>
                            <Input
                                id="destination"
                                type="text"
                                placeholder="/path/to/destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file">ファイル</Label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                                    isDragging
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Input
                                    id="file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Upload className="h-10 w-10 text-muted-foreground" />
                                    <Label
                                        htmlFor="file"
                                        className="cursor-pointer text-primary hover:underline"
                                    >
                                        ファイルを選択
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        または、ここにファイルをドラッグ＆ドロップ
                                    </p>
                                </div>
                                {file && (
                                    <div className="mt-4 p-2 bg-muted rounded-md">
                                        <p className="text-sm font-medium">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={!file || !destination}
                            className="w-full"
                        >
                            アップロード
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
