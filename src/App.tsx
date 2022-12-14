import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Bookings } from "./components/pages/Bookings";
import { Home } from "./components/pages/Home";
import { Admin } from "./components/pages/Admin";
import { SingleBooking } from "./components/adminComponents/SingleBooking";
import "./styles/layout/layout.scss";
import { LoginAdmin } from "./components/adminComponents/LoginAdmin";
import { CancelBooking } from "./components/bookingComponents/CancelBooking";
import { NotFound } from "./components/notfound";
import { Contact } from "./components/pages/Contact";
import { Menu } from "./components/pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/booktable/searchtables" element={<Bookings />}></Route>
          <Route path="/booktable/choose-time" element={<Bookings />}></Route>
          <Route path="/booktable/persondata" element={<Bookings />}></Route>

          <Route
            path="/booktable/cancel/:id"
            element={<CancelBooking />}
          ></Route>
          <Route path="/admin/login" element={<LoginAdmin />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/:id" element={<SingleBooking />}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
        </Route>

        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/admin/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
