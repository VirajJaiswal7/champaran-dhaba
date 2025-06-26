import AddItems from "./pages/AddItems";
import Navbar from "./components/Navbar";
import AllItems from "./pages/AllItems";
import Orders from "./pages/Orders";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";

const App = () => {
  const isAuth = useSelector((store) => store?.user?.isAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;
  return (
    <div>
      <Toaster />
      {isAuth ? (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar className="" />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<AddItems />} />
                <Route path="/allitems" element={<AllItems />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
};

export default App;
