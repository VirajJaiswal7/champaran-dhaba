import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBackend } from "./useBackend";
import axios from "axios";
import { setItems } from "@/redux/itemSlice";
import { toast } from "sonner";
import { listItems } from "@/assets/asset";

export const useListOfItems = () => {
  const [value, setValue] = useState(null);
  const [show, setShow] = useState(true);
  const items = useSelector((store) => store?.items?.items);

  const filterItem = items?.filter((item) => {
    return item.category === value;
  });

  const handleValue = (item) => {
    setValue(item);
    setShow(false);
  };

  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const handleItem = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/item/getitem`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setItems(res?.data?.item));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleItem();
  }, []);

  return {
    listItems,
    handleValue,
    filterItem,
    show,
    items,
  };
};
