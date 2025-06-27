import { useParams } from "react-router-dom";
import { useBackend } from "./useBackend";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { setSaveCart } from "@/redux/itemSlice";

export const useItemDescr = () => {
  const { id } = useParams();
  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector((store) => store?.items?.items);

  const filterItem = items?.find((item) => item?._id === id);
  const filterCategory = items?.filter(
    (item) => item?.category === filterItem?.category
  );

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/item/addcart/${filterItem?._id}`,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setSaveCart(res?.data?.cart));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    filterItem,
    setImage,
    image,
    handleCart,
    isLoading,
    filterCategory,
  };
};
