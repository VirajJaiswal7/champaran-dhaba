import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux/itemSlice";
import Items from "@/components/Items";

const AllItems = () => {
  const { backendUrl } = useBackend();

  const dispatch = useDispatch();
  const handleItems = async () => {
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

  const items = useSelector((store) => store?.items?.items);
  useEffect(() => {
    handleItems();
  }, [Items]);

  return (
    <div className="">
      <div className="px-8 py-4">
        <div className="hidden lg:grid grid-cols-6 border-b border-b-gray-300 pb-4">
          <p className="font-semibold">Image</p>
          <p className="font-semibold">Name</p>
          <p className="font-semibold">Category</p>
          <p className="font-semibold">Price</p>
          <p className="font-semibold">Delete</p>
          <p className="font-semibold">Edit</p>
        </div>
        {items?.map((item, index) => (
          <Items item={item} key={index} handleItems={handleItems}/>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
