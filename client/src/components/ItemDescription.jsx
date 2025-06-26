import { useParams } from "react-router-dom";
import RelatedItem from "./RelatedItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { setSaveCart } from "../redux/itemSlice";

const ItemDescription = () => {
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

  if (!filterItem) {
    return <p>Item not found</p>;
  }

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

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between lg:gap-12 space-y-16 lg:space-y-0">
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full lg:w-[40%] md:w-2/3 items-center">
          <div className="flex flex-row md:flex-col gap-4  overflow-x-scroll md:overflow-visible w-[95%] md:w-full scrollbar">
            {filterItem.image.map((items, index) => (
              <div key={index} className="shrink-0 min-w-[5rem]">
                <img
                  src={items}
                  alt=""
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md cursor-pointer"
                  onClick={() => setImage(items)}
                />
              </div>
            ))}
          </div>
          <img
            src={image ? image : filterItem.image[0]}
            alt=""
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-col w-full lg:w-[35%] space-y-8">
          <p className="text-2xl sm:text-4xl font-semibold text-orange-700">
            {filterItem?.name}
          </p>
          <p className="text-[14px] sm:text-[16px] text-gray-700">
            {filterItem?.description}
          </p>
          <p className="text-2xl sm:text-4xl font-semibold tracking-tight text-orange-700 font-sans">
            {filterItem?.price}
            <span className="text-xl sm:text-2xl">rs.</span>
          </p>
          <button
            onClick={handleCart}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer w-full sm:w-fit" // ✅ Full width on mobile
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>{" "}
              </div>
            ) : (
              "Add Item"
            )}
          </button>
        </div>
      </div>
      <div>
        <p className="font-semibold text-2xl sm:text-4xl text-orange-700 mt-20">
          Related Items
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 my-12">
        {filterCategory.map((item, index) => (
          <RelatedItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ItemDescription;
