import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import FileUploadPage from "./uploader/file-upload-page";
import Layout from "./layout";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<FileUploadPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
