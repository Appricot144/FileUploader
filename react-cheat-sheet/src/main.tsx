import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import FileUploadPage from "./uploader/file-upload-page";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FileUploadPage />} />
    </Routes>
  </BrowserRouter>
);
