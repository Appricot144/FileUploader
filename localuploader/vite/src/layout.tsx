import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col"><Outlet /></main>
      </div>
      <Footer />
    </div>
  );
}
