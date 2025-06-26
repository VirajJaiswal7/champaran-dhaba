import { logo } from "../assets/asset";
import { ImSpoonKnife } from "react-icons/im";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto my-5 px-2 md:px-4">
      <div className="relative bg-orange-300 h-120 rounded-xl">
        <img
          src={logo.chicken}
          alt=""
          className=" bg-cover h-full w-full rounded-xl opacity-80"
        />
        <div className="absolute top-0 p-4 md:p-16 space-y-6">
          <div className="flex items-center gap-4">
            <ImSpoonKnife className="text-white w-10 md:w-16 h-10 md:h-16" />
            <h1 className="text-white text-3xl md:text-5xl font-semibold">Champaran</h1>
          </div>
          <p className="md:text-lg w-full md:max-w-2xl text-white lg:hidden block">
            Champaran is a traditional dhaba that serves the most popular
            Chicken Handi and a wide variety of other delicious items.
          </p>
          <p className="hidden lg:block text-lg max-w-4xl text-gray-200 tracking-wide truncate">
            Champaran is a well-known dhaba that has won the hearts of food
            lovers with <br /> its authentic flavors and rustic charm. Our
            signature dish, Chicken Handi,
            <br /> is slow-cooked in sealed clay pots, infusing the meat with
            rich spices and smoky aromas.
            <br /> Beyond that, we offer a wide range of mouthwatering items
            including mutton curry, <br /> kebabs, and traditional Indian breads
            — all crafted with love and tradition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
