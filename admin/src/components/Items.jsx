import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import React, { useState } from "react";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Items = ({ item, handleItems }) => {
  const { backendUrl } = useBackend();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${backendUrl}/api/item/deleteitem/${item?._id}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        handleItems();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${backendUrl}/api/item/updateitem/${item?._id}`,
        { name, price },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        handleItems();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 border p-4 lg:border-none lg:p-0 space-y-2 lg:space-y-0 lg:grid-cols-6 items-center my-5">
        <img src={item?.image[0]} alt="" className="w-16 h-16 object-cover" />
        <p className="text-gray-700">{item?.name}</p>
        <p className="text-gray-700">{item?.category}</p>
        <p className="text-gray-700 font-sans">{item?.price}</p>
        <p>
          <MdDelete
            onClick={handleDelete}
            className="text-gray-700 w-6 h-6 cursor-pointer"
          />
        </p>
        <p>
          <MdEdit
            onClick={() => setOpen(!open)}
            className="text-gray-700 w-6 h-6 cursor-pointer"
          />
        </p>
      </div>
      {open && (
        <form
          onSubmit={handleUpdate}
          className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-50 bg-white w-[300px] border border-gray-300 rounded-md p-4"
        >
          <div className="flex justify-end mb-2">
            <RxCross2 className="w-6 h-6" onClick={() => setOpen(false)} />
          </div>
          <h1 className="text-2xl font-semibold text-orange-700 tracking-wider text-center">
            Update Item
          </h1>
          <div className="my-5 space-y-4">
            <div className="space-y-2">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter name"
                className="border border-gray-200 py-1 px-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <p>Price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                min={0}
                placeholder="Enter price"
                className="border border-gray-200 py-1 px-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Update"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default Items;
