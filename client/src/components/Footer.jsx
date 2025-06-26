import { MdLocalDining } from "react-icons/md";
import { listItems } from "../assets/asset";

const Footer = () => {
  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-16 bg-gray-50 p-4 md:p-8">
      <div className="flex lg:flex-row flex-col justify-between space-y-16 lg:gap-0">
        <div className="space-y-3">
          <MdLocalDining className="w-16 h-16 text-orange-500" />
          <p className="text-2xl sm:text-4xl font-semibold text-orange-500">Champaran</p>
          <h1 className="md:w-[300px] text-gray-700 md:text-[16px] text-sm">
            Champaran is a traditional dhaba that serves the most popular
            Chicken Handi and a wide variety of other delicious items.
          </h1>
        </div>
        <div className="space-y-6">
          <h1 className="text-xl sm:text-3xl font-semibold tracking-widest text-orange-700">All Items</h1>
          <ul className="list-disc marker:text-orange-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-2 space-x-12 space-y-2">
            {listItems.map((item, index) => (
              <li className="text-gray-700 text-sm md:text-[16px] mx-6">{item.category}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-[16px] tracking-wide font-semibold font-sans text-orange-800">satish12@gmail.com</p>
          <p className="text-[16px] tracking-wide font-semibold font-sans text-orange-800">+91 7985846545</p>
          <p className="md:w-[300px] text-gray-700 text-sm md:text-[16px]">Dhaba is located near of Modern Public School front of Patrol Pump.</p>
        </div>
      </div>
      <p className="font-semibold text-center tracking-wider pt-8 text-orange-800">Copyright@submit-by-VirajJaiswal</p>
    </div>
  );
};

export default Footer;
