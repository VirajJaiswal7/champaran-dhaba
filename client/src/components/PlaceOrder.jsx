import React from "react";

const PlaceOrder = ({ item }) => {
  const deliveryCharge = 50;

  const subtotal = item?.reduce((acc, curr) => {
    return acc + curr?.itemId?.price * curr?.quantity;
  }, 0);

  const totalPrice = subtotal + deliveryCharge;
  return (
      <div>
        <div className="p-4 shadow-sm rounded-sm">
          <div>
            <h1 className="font-semibold text-4xl">Your Orders</h1>
            <div className="mt-6 border-b border-gray-300 pb-2">
              {item.map((item, index) => (
                <>
                  <div className="flex justify-between space-y-2">
                    <p>{item?.itemId?.name}</p>
                    <p className="font-sans">
                      {item?.itemId?.price * item?.quantity}
                    </p>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-between py-2 border-b  border-gray-400">
              <p>Delivery Charge</p>
              <p className="font-sans">{deliveryCharge} rs</p>
            </div>
            <div className="pt-4 flex justify-between">
              <p className="font-semibold ">Total Price</p>
              <p className="font-sans font-semibold">{totalPrice} rs</p>
            </div>
          </div>
        </div>
      
      </div>
  );
};

export default PlaceOrder;
