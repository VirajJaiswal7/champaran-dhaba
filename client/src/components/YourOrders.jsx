import React from "react";
import { useSelector } from "react-redux";

const YourOrders = () => {
  const orderData = useSelector((store) => store?.items?.orderData);

  if (!orderData || !Array.isArray(orderData.order)) {
    return <p>No orders found</p>;
  }

  return (
    <div className="max-w-7xl my-10 mx-auto px-2">
      <h1 className="text-2xl font-bold mb-8">Your Orders</h1>
      <div className="hidden sm:grid grid-cols-4 border-b border-gray-300 pb-4">
        <p>Image</p>
        <p>Name</p>
        <p>Total Price</p>
        <p>Ordered</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 my-10 items-center gap-6 border border-gray-200 p-4 sm:border-none sm:p-0">
        {orderData?.cart?.map((item) => (
          <>
            <img
              src={item?.itemId?.image?.[0]}
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div>{item?.itemId?.name}</div>
            <p className="font-sans">{item?.itemId?.price * item?.quantity}</p>
            <p>Recieved</p>
          </>
        ))}
      </div>
      <div className="space-y-2">
        <h1 className="font-bold">Cancel Order</h1>
          <p>
            If cancel order than contact Phone number within{" "}
            <span className="font-sans font-bold">30 </span>minutes :{" "}
          </p>
          <p className="font-sans font-semibold">+91 7985846545</p>
      </div>
    </div>
  );
};

export default YourOrders;
