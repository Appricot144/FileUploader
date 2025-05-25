import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import FileUploadPage from "./uploader/file-upload-page";
import FileHistoryPage from "./file-history/file-history";
import Layout from "./layout";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<>まだない</>} />
        <Route index element={<FileUploadPage />} />
        <Route path="/history" element={<FileHistoryPage />} />
        <Route path="/setting" element={<>まだない</>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
