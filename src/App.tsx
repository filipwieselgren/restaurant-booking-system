import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Bookings } from "./components/pages/Bookings";
import "./App.css";
import "./styles/layout.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/booktable" element={<Bookings />}></Route>
          <Route path="/booktable/choose-time" element={<Bookings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
