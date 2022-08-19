import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./pages/Navigation";

export const Layout = () => {
  return (
    <div>
      <header>
        {" "}
        <Navigation />
      </header>
      <section>
        <main>
          <Outlet></Outlet>
        </main>
      </section>
    </div>
  );
};
