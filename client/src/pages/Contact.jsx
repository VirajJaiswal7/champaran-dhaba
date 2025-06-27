import React from "react";
import { MdConnectWithoutContact } from "react-icons/md";


const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-6 md:px-40 py-10">
      <div className="grid md:grid-cols-2 gap-24 items-center justify-center">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-orange-700 mb-10">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700">
            Got a question or want to place an order? We'd love to hear from
            you!
          </p>
          <div>
            <p className="font-semibold text-gray-800">📞 Phone:</p>
            <p className="text-gray-600 font-sans">+91 7985846545</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">📍 Address:</p>
            <p className="text-gray-600">
              Champaran Dhaba, Main Road, Bhadohi, Near by Modern Public School
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">✉️ Email:</p>
            <p className="text-gray-600">satish12@gmail.com</p>
          </div>
        </div>
        <div>
          <MdConnectWithoutContact className="w-56 h-56 text-orange-500"/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
