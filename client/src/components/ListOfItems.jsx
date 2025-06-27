import { useListOfItems } from "../../hooks/useListOfItems";
import RelatedItem from "./RelatedItem";

const ListOfItems = () => {
  const { listItems, handleValue, filterItem, show, items } = useListOfItems();
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
              <h1 className="text-gray-700">{item?.category}</h1>
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
