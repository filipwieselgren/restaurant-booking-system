import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { Bookings } from "./components/pages/Bookings";

import "./styles/layout.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/booktable" element={<Bookings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
