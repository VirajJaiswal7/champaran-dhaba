import React from "react";
import { logo } from "../assets/asset";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-6 md:px-40 py-10 rounded-xl space-y-16">
      {/* About Champaran */}
      <div className="flex flex-col md:flex-row items-center gap-16">
        <img
          src={logo.chicken}
          alt="About Champaran"
          className="w-96 h-[500px] object-cover rounded-2xl shadow-lg"
        />
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-orange-700">About Champaran</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Champaran is a traditional Indian dhaba dedicated to delivering rich, homely flavors through
            time-honored recipes. Known for our signature Chicken Handi, we slow-cook our dishes in sealed
            clay pots for unmatched aroma and taste. From spicy non-veg curries to creamy paneer dishes,
            every meal is prepared with love, hygiene, and authenticity. Our mission is simple: serve
            soulful, satisfying food that makes people come back for more.
          </p>
        </div>
      </div>

      {/* Our Specialties */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-orange-700">Our Specialties</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our menu is a celebration of Indian cuisine. Highlights include Chicken Tikka, Paneer Masala,
          Mutton Curry, and our crowd-favorite Chicken Handi. Every item is made fresh with the finest
          ingredients and spices. We also offer a variety of vegetarian options like Paneer Chilly,
          Mataka Paneer, and more—perfect for every food lover.
        </p>
      </div>

      {/* Our Cooking Style */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-orange-700">Our Cooking Style</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At Champaran, we believe in slow-cooking methods that enhance flavor and retain nutrition.
          Our dishes are prepared in traditional handis and served hot, straight from the fire. We
          follow age-old recipes and avoid shortcuts—because good food takes time and care.
        </p>
      </div>

      {/* Hygiene & Quality */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-orange-700">Hygiene & Quality</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Cleanliness and quality are at the heart of everything we do. From our kitchen to your table,
          we ensure the highest standards in food preparation. Our ingredients are hand-picked daily,
          and we maintain a spotless kitchen that prioritizes both taste and safety.
        </p>
      </div>

      {/* Customer Experience */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-orange-700">Customer Experience</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We don’t just serve food—we serve happiness. Our cozy ambiance, friendly staff, and quick
          service ensure that every visit is memorable. Whether it’s a family dinner or a solo craving,
          Champaran welcomes you with warmth and the flavors of home.
        </p>
      </div>
    </div>
  );
};

export default About;
