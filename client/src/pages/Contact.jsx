import React from "react";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-6 md:px-40 py-10">
      <div className="grid md:grid-cols-2 gap-24 items-center">
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

        {/* Contact Form */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
