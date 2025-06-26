import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { removeItemFromCart, setSaveCart } from "../redux/itemSlice";
import PlaceOrder from "@/components/PlaceOrder";
import { NavLink } from "react-router-dom";

const AddToCart = () => {
  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const saveCart = useSelector((store) => store?.items?.saveCart);

  return (
    saveCart.length > 0 && (
      <div className="px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16 my-10 space-y-10">
        <div className="hidden md:grid grid-cols-7 font-semibold text-gray-700 border-b border-gray-300 pb-4">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Total Price</p>
          <p className="flex flex-wrap">Inc/Dec</p>
          <p>Delete</p>
        </div>
        <div className="space-y-6">
          {saveCart?.map((item, index) => {
            const handleDelete = async () => {
              try {
                const res = await axios.delete(
                  `${backendUrl}/api/item/removecart/${item?.itemId?._id}`,
                  { withCredentials: true }
                );

                if (res?.data?.success) {
                  toast.success(res?.data?.message);
                  dispatch(removeItemFromCart(item?.itemId?._id));
                }
              } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
              }
            };

            const handleIncrease = async () => {
              try {
                const res = await axios.put(
                  `${backendUrl}/api/item/increase/${item?.itemId?._id}`,
                  {},
                  { withCredentials: true }
                );

                if (res?.data?.message) {
                  toast.success(res?.data?.message);
                  dispatch(setSaveCart(res.data.cart)); // 🔁 Update Redux
                }
              } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
              }
            };

            const handleDecrease = async () => {
              try {
                const res = await axios.put(
                  `${backendUrl}/api/item/decrease/${item?.itemId?._id}`,
                  {},
                  { withCredentials: true }
                );

                if (res?.data?.message) {
                  toast.success(res?.data?.message);
                  dispatch(setSaveCart(res.data.cart)); // 🔁 Update Redux
                }
              } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
              }
            };
            return (
              <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-4 border-b md:border-none pb-4 md:pb-0 border p-4 rounded-sm border-gray-300">
                <img
                  src={item?.itemId?.image?.[0]}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <p>{item?.itemId?.category}</p>
                <p>{item?.itemId?.name}</p>
                <p className="font-sans">{item?.itemId?.price} rs</p>
                <p className="font-sans">
                  <span className="md:hidden block font-semibold">Total :</span> {item?.itemId?.price * item?.quantity} rs
                </p>
                <div className="flex justify-start md:justify-between gap-3 bg-white rounded-full shadow-md w-fit md:w-full px-4 py-1">
                  <FaCircleMinus
                    onClick={handleDecrease}
                    className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer"
                  />
                  <p>{item?.quantity}</p>
                  <FaCirclePlus
                    onClick={handleIncrease}
                    className="w-6 h-6 text-green-500 hover:text-green-600 cursor-pointer"
                  />
                </div>
                <span>
                  <MdDelete
                    className="w-6 h-6 text-gray-700 cursor-pointer"
                    onClick={handleDelete}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center md:items-end justify-end max-w-7xl mx-auto">
          <div className="sm:w-[400px] space-y-8">
            <PlaceOrder item={saveCart} className="" />
            <div className="w-full">
              <NavLink to="/order">
                <button className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-md text-white ">
                  Place Order
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddToCart;
