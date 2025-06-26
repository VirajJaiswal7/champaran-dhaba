import { useEffect, useState } from "react";
import { listItems } from "../assets/asset";
import RelatedItem from "./RelatedItem";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../redux/itemSlice";

const ListOfItems = () => {
  const [value, setValue] = useState(null);
  const [show, setShow] = useState(true);
  const items = useSelector((store) => store?.items?.items);
  console.log(items)

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


  return (
    <div className="my-20 max-w-7xl mx-auto px-2 md:px-4">
      <div className="space-y-12">
        <h1 className="text-3xl font-semibold text-center text-orange-700">
          Click and find related Items
        </h1>
        <div className="flex gap-12 overflow-x-auto scroll-auto scrollbar">
          {listItems.map((item, index) => (
            <div
              className="min-w-[120px]  flex flex-col items-center space-y-2"
              key={index}
            >
              <img
                src={item.image}
                alt=""
                className="rounded-full w-24 h-24 object-cover cursor-pointer"
                onClick={() => handleValue(item?.category)}
              />
              <h1 className="text-gray-700">{item.category}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-20">
        {filterItem.map((item, index) => (
          <RelatedItem key={index} item={item} />
        ))}
      </div>
      {show && (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-20">
          {items.map((item, index) => (
            <RelatedItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfItems;
