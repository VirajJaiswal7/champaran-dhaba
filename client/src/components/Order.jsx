import { useOrder } from "../../hooks/useOrder";
import PlaceOrder from "./PlaceOrder";

const Order = () => {
  const {
    handleOrderSubmit,
    firstname,
    setFirstname,
    setLastName,
    lastname,
    setEmail,
    email,
    setStreet,
    street,
    setState,
    state,
    setPincode,
    pincode,
    setCountry,
    country,
    setCity,
    city,
    setPhone,
    phone,
    saveCart,
    isLoading,
  } = useOrder();
  return (
    <form
      onSubmit={handleOrderSubmit}
      className="max-w-7xl mx-auto my-20 flex flex-col gap-4 px-2 md:flex-row justify-between items-center"
    >
      <div className="sm:w-[500px] space-y-4">
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
      <div className="sm:w-[400px] space-y-8">
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
