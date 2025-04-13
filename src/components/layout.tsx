import { Outlet } from "react-router-dom";

import Header from "./header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 p-4">
      <Outlet />
    </main>
  </div>
  )
}

export default Layout
