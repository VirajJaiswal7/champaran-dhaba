import { transporter } from "../utils/transport.js";

export const sendOrderEmail = async (order, cartItems) => {
  const itemDetails = cartItems
    .map(
      (item, index) => `${index + 1}. ${item.itemId.name} (x${item.quantity})`
    )
    .join("\n");

  const mailOptions = {
    from: `"Champaran Orders" <${process.env.ADMIN_EMAIL_SENDER}>`,
    to: process.env.ADMIN_NOTIFY_EMAIL,
    subject: "🔔 New Order Received!",
    text: `📋 New Order Details:

👤 Name: ${order.firstname} ${order.lastname}
📧 Email: ${order.email}
📞 Phone: ${order.phone}

📍 Address:
${order.street}, ${order.city}, ${order.state} - ${order.pincode}, ${order.country}

🛒 Items:
${itemDetails}

⏰ Order Time: ${new Date().toLocaleString()}`
  };

  await transporter.sendMail(mailOptions);
};
