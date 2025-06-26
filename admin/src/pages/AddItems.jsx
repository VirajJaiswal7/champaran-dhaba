import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";

const AddItems = () => {
  const { backendUrl } = useBackend();
  const [isLoading, setIsLoading] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Simple Chicken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    try {
      setIsLoading(true);
      const res = await axios.post(`${backendUrl}/api/item/additem`, formData, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
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
      onSubmit={handleSubmit}
      className="px-2 md:px-6 lg:px-12 py-4 space-y-12"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:w-1/2">
        <label htmlFor="image1">
          <img
            src={!image1 ? assets.upload : URL.createObjectURL(image1)}
            alt=""
            className="w-20"
          />
          <input
            type="file"
            onChange={(e) => setImage1(e.target.files[0])}
            id="image1"
            hidden
          />
        </label>
        <label htmlFor="image2">
          <img
            src={!image2 ? assets.upload : URL.createObjectURL(image2)}
            alt=""
            className="w-20"
          />
          <input
            type="file"
            onChange={(e) => setImage2(e.target.files[0])}
            id="image2"
            hidden
          />
        </label>
        <label htmlFor="image3">
          <img
            src={!image3 ? assets.upload : URL.createObjectURL(image3)}
            alt=""
            className="w-20"
          />
          <input
            type="file"
            onChange={(e) => setImage3(e.target.files[0])}
            id="image3"
            hidden
          />
        </label>
        <label htmlFor="image4">
          <img
            src={!image4 ? assets.upload : URL.createObjectURL(image4)}
            alt=""
            className="w-20"
          />
          <input
            type="file"
            onChange={(e) => setImage4(e.target.files[0])}
            id="image4"
            hidden
          />
        </label>
      </div>
      <div className="flex flex-col w-full sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] space-y-6">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter name"
          className="border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Enter description"
          className="border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          rows={5}
        />
        <div className="flex sm:flex-row flex-col justify-between gap-2">
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="border rounded-md py-2 px-3 border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
            min={0}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border border-gray-300 
          py-2 rounded-md px-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
          >
            <option value="Simple Chicken" className="text-gray-700">
              Simple Chicken
            </option>
            <option value="Chicken Tikka" className="text-gray-700">
              Chicken Tikka
            </option>
            <option value="Chicken Handi" className="text-gray-700">
              Chicken Handi
            </option>
            <option value="Chicken Masala" className="text-gray-700">
              Chicken Masala
            </option>
            <option value="Paneer Masala" className="text-gray-700">
              Paneer Masala
            </option>
            <option value="Paneer Tikka" className="text-gray-700">
              Paneer Tikka
            </option>
            <option value="Paneer Chilli" className="text-gray-700">
              Paneer Chilli
            </option>
            <option value="Mutton Handi" className="text-gray-700">
              Mutton Handi
            </option>
            <option value="Matka Paneer" className="text-gray-700">
              Matka Paneer
            </option>
            <option value="Paneer Spicy" className="text-gray-700">
              Paneer Spicy
            </option>
            <option value="Chicken Spicy" className="text-gray-700">
              Chicken Spicy
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 py-3 rounded-md text-white mt-4"
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Add Item"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddItems;
