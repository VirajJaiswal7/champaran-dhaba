import { useDispatch, useSelector } from "react-redux";
import RelatedItem from "../components/RelatedItem";
import { RxCross2 } from "react-icons/rx";
import { setOpenSearch } from "@/redux/userSlice";
import { useState } from "react";

const Items = () => {
  const items = useSelector((store) => store?.items?.items);
  const openSearch = useSelector((store) => store?.user?.openSearch);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const filterItem = items.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item?.category?.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div className="mt-6">
        {openSearch && (
          <div className="w-full flex justify-center items-center gap-2">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              type="text"
              className="w-1/2 border rounded-full py-1.5 px-3"
              placeholder="Search"
            />
            <RxCross2
              onClick={() => dispatch(setOpenSearch(false))}
              className="w-8 h-8"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-20">
        {filterItem.map((item, index) => (
          <RelatedItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Items;
