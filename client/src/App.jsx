import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Footer from "./components/Footer";
import ItemDescription from "./components/ItemDescription";
import Login from "./pages/Login";
import SavedItem from "./components/SavedItem";
import { Toaster } from "sonner";
import AddToCart from "./pages/AddToCart";
import Order from "./components/Order";
import YourOrders from "./components/YourOrders";
import Preloader from "./components/Preloader";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // You can adjust this time

    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  const hideFooterRoutes = ["/login"];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;
  return (
    <div className="">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/itemdescription/:id" element={<ItemDescription />} />
        <Route path="/addcart" element={<AddToCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saveditem" element={<SavedItem />} />
        <Route path="/order" element={<Order />} />
        <Route path="/yourorders" element={<YourOrders />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
