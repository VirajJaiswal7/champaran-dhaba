import React, { useState } from "react";
import PlaceOrder from "./PlaceOrder";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { setOrderData, setSaveCart } from "@/redux/itemSlice";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const saveCart = useSelector((store) => store?.items?.saveCart);
  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/order/send`,
        {
          firstname,
          lastname,
          email,
          street,
          city,
          state,
          pincode,
          country,
          phone,
        },
        { withCredentials: true }
      );

      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setOrderData(res?.data?.user));
        navigate("/yourorders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleOrderSubmit}
      className="max-w-7xl mx-auto my-20 flex flex-col gap-4 px-2 md:flex-row justify-between items-center"
    >
      <div className="w-[500px] space-y-4">
        <div className="flex gap-2">
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            type="text"
            placeholder="First name"
            className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
            type="text"
            placeholder="Last name"
            className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
          />
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
        />
        <input
          onChange={(e) => setStreet(e.target.value)}
          value={street}
          type="text"
          placeholder="Street"
          className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
        />
        <div className="flex gap-2">
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            placeholder="City"
            className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
          />
          <input
            onChange={(e) => setState(e.target.value)}
            value={state}
            type="text"
            placeholder="State"
            className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
          />
        </div>
        <div className="flex gap-2">
          <input
            onChange={(e) => setPincode(e.target.value)}
            value={pincode}
            type="number"
            placeholder="Pincode"
            className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
          />
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            type="text"
            placeholder="Country"
            className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
          />
        </div>
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="number"
          placeholder="Phone"
          className="w-full border border-gray-400 py-2 px-3 placeholder:text-gray-500 rounded-sm"
        />
      </div>
      <div className="w-[400px] space-y-8">
        <PlaceOrder item={saveCart} />
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 rounded-md text-white"
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Order"
          )}
        </button>
      </div>
    </form>
  );
};

export default Order;
