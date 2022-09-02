import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <section>
        <main>
          <Outlet></Outlet>
        </main>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};
