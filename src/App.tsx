import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Confirmation } from "./components/bookingComponents/Confirmation";
import { Layout } from "./components/layout/Layout";
import { Bookings } from "./components/pages/Bookings";
import { Home } from "./components/pages/Home";
import { Admin } from "./components/pages/Admin";
import { SingleBooking } from "./components/adminComponents/SingleBooking";
import { AddBooking } from "./components/adminComponents/AddBooking";
import "./styles/layout.scss";
import { CancelBooking } from "./components/bookingComponents/CancelBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/booktable/searchtables" element={<Bookings />}></Route>
          <Route path="/booktable/choose-time" element={<Bookings />}></Route>
          <Route path="/booktable/persondata" element={<Bookings />}></Route>
          <Route path="/booktable/post" element={<Confirmation />}></Route>
          <Route
            path="/booktable/cancel/:id"
            element={<CancelBooking />}
          ></Route>

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/:id" element={<SingleBooking />}></Route>
          <Route path="/admin/addbooking" element={<AddBooking />}></Route>
          <Route path="/admin/:id/edit" element={<Bookings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
