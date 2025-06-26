import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { useDispatch, useSelector } from "react-redux";
import { setSaveItems } from "@/redux/itemSlice";

const RelatedItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backendUrl } = useBackend();
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${backendUrl}/api/item/saveitem/${item?._id}`,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setSaveItems(res?.data?.savedItems));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const saveItems = useSelector((store) => store?.items?.saveItems);

  const isSaved = saveItems?.some(
    (savedItem) => savedItem._id.toString() === item._id.toString()
  );

  return (
    <div>
      <div className="h-[400px] shadow-md rounded-xl md:hover:scale-105 transition-all duration-300 space-y-2">
        <img
          src={item.image[0]}
          alt=""
          className="h-[250px] w-full object-cover rounded-t-xl cursor-pointer"
          onClick={() => navigate(`/itemdescription/${item?._id}`)}
        />
        <div className="space-y-3 py-2 px-4">
          <h1 className="text-xl font-semibold text-orange-700">
            {item?.name}
          </h1>
          <p className="truncate md:w-50 text-gray-700">{item?.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-orange-700 font-sans tracking-tight">{item?.price}</p>
            <FaHeart
              className={`w-6 h-6 cursor-pointer ${
                isSaved ? "text-red-600" : " text-gray-300"
              }`}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
