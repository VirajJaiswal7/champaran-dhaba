import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../redux/itemSlice";
import { MdDelete } from "react-icons/md";

const Orders = () => {
  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const handlegetOrder = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/get`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setOrders(res?.data?.orders));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handlegetOrder();
  }, []);

  const orders = useSelector((store) => store?.items?.orders);
  return (
    <div className="px-4 md:px-10 lg:px-16 py-4">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 md:gap-10 lg:gap-16">
        {orders?.map((order) => {
          const handleDelete = async () => {
            try {
              const res = await axios.delete(
                `${backendUrl}/api/order/orderdelete/${order?._id}`,
                { withCredentials: true }
              );

              if (res?.data?.success) {
                toast.success(res?.data?.message);
                handlegetOrder();
              }
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message);
            }
          };
          return (
            <div className="shadow-sm p-4 space-y-3 rounded-sm border border-gray-200">
              <div className="border  border-gray-300 rounded-xs p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <p className="font-semibold">Name : </p>
                    <p>
                      {order?.firstname}
                      {order?.lastname}
                    </p>
                  </div>
                  <span>
                    <MdDelete
                      onClick={() => {
                        const confirm = window.confirm(
                          "Are you sure you want to mark this order as completed?"
                        );
                        if (confirm) {
                          handleDelete();
                        }
                      }}
                      className="w-6 h-6 cursor-pointer text-gray-700 hover:text-red-500"
                    />
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-1">
                  <p className="font-semibold">Address : </p>
                  <p>{order?.country},</p>
                  <p>{order?.state},</p>
                  <p>{order?.city},</p>
                  <p className="font-sans">{order?.pincode},</p>
                  <p>{order?.street}</p>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <p className="font-semibold">Phone Number : </p>
                  <p className="font-sans">{order?.phone}</p>
                </div>
                <p className="gap-2 flex">
                  <p className="font-semibold">Ordered on:</p>
                  <div>
                    {order?.userId?.createdAt &&
                      new Date(order.userId.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                  </div>
                </p>
              </div>
              <div className="border  border-gray-300 rounded-xs p-4 space-y-3 overflow-x-auto">
                {order?.items?.map((item) => (
                  <div className="border-b border-b-gray-200 pb-2">
                    <div className="flex flex-wrap gap-2">
                      <p className="font-semibold">Category : </p>
                      <p>{item?.itemId?.category}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="font-semibold">Item Name : </p>
                      <p>{item?.itemId?.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="font-semibold">Price : </p>
                      <p className="font-sans">{item?.itemId?.price}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="font-semibold">Quantity : </p>
                      <p className="font-sans">{item?.quantity}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <p className="font-semibold">Total Price : </p>
                      <p className="font-sans">
                        {item?.itemId?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
