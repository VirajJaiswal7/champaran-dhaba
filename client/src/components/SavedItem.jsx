import React from "react";
import RelatedItem from "./RelatedItem";
import { useSelector } from "react-redux";


const SavedItem = () => {

  const saveItems = useSelector((store) => store?.items?.saveItems);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 px-2 ">
        {saveItems?.map((item, index) => (
          <div>
            <RelatedItem item={item} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItem;
