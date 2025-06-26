import { Item } from "../models/item.model.js";
import { uploadMedia } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

export const addItem = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await uploadMedia(item?.path, { resource_type: "auto" });
        return result.secure_url; // or result.url if uploadMedia returns an object with url
      })
    );

    const item = new Item({
      name,
      description,
      category,
      price,
      image: imageUrl,
    });

    await item.save();

    return res.status(201).json({
      message: "Item add successfully",
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await Item.find({});
    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
    return res.satus(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    if (!itemId) {
      return res.status(400).json({
        message: "itemId must be provide",
      });
    }

    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Item deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const itemId = req.params.itemId;
    if (!itemId) {
      return res.status(400).json({
        message: "itemId must be provide",
      });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    const updateItem = await Item.findByIdAndUpdate(
      itemId,
      {
        name: name || item?.name,
        price: price || item?.price,
      },
      { new: true }
    );

    await updateItem.save();

    return res.status(200).json({
      message: "Item updated successfully",
      success: true,
      item: updateItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const saveItem = async (req, res) => {
//   try {
//     const itemId = req.params.itemId;
//     const userId = req.id;

//     const existUser = await User.findById(userId);
//     if (!itemId) {
//       return res.status(400).json({
//         message: "Please Provide itemId",
//         success: false,
//       });
//     }

//     existUser.saved.includes(itemId)
//       ? existUser.saved.pull(itemId)
//       : existUser.saved.push(itemId);

//     await existUser.save();

//     const updateItem = await User.findById(userId).populate("saved");
//     return res.status(200).json({
//       message: "Item saved/unsaved successfully",
//       success: true,
//       updateItem,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

export const saveItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.id;

    if (!itemId) {
      return res.status(400).json({
        message: "Please provide itemId",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Convert ObjectIds to strings for comparison
    const savedIds = user.saved.map((id) => id.toString());
    const isSaved = savedIds.includes(itemId);

    if (isSaved) {
      user.saved.pull(itemId); // remove
    } else {
      user.saved.push(itemId); // add
    }

    // Save the user after modification
    await user.save();

    const updatedUser = await User.findById(userId).populate("saved");

    return res.status(200).json({
      message: isSaved
        ? "Item unsaved successfully"
        : "Item saved successfully",
      success: true,
      savedItems: updatedUser.saved,
    });
  } catch (error) {
    console.error("Error in saveItem:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const addItemInCart = async (req, res) => {
  try {
    const userId = req.id;
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        message: "user not exist",
        success: false,
      });
    }

    const alreadyInCart =
      Array.isArray(user.cart) &&
      user.cart.some((cartItem) => cartItem?.itemId?.toString() === itemId);

    if (alreadyInCart) {
      return res.status(400).json({
        message: "Item already in cart",
        success: false,
      });
    }

    user.cart.push({ itemId, quantity: 1 });
    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.itemId");

    return res.status(200).json({
      message: "Add Item succssfully",
      success: true,
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const itemId = req.params.itemId;
    const user = await User.findById(userId);

    const inCart = user.cart.some(
      (cartItem) => cartItem.itemId && cartItem.itemId.toString() === itemId
    );

    if (!inCart) {
      return res.status(400).json({
        message: "Item not in a cart",
        success: false,
      });
    }

    user.cart = user.cart.filter(
      (cartItem) => cartItem.itemId.toString() !== itemId
    );

    await user.save();

    return res.status(200).json({
      message: "Item remove from cart",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const increaseCartItemQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const itemId = req.params.itemId;

    const user = await User.findById(userId);
    const cartItem = user.cart.find(
      (item) => item.itemId.toString() === itemId
    );

    if (!cartItem) {
      return res.status(400).json({
        message: "Item not found in cart",
        success: false,
      });
    }

    // cartItem.quantity += 1;
    cartItem.quantity += 1;
    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.itemId");

    return res.status(200).json({
      message: "Quantity increased",
      success: true,
      cart: updatedUser.cart, // ✅ This now has item details
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const decreaseCartItemQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const itemId = req.params.itemId;

    const user = await User.findById(userId);

    const cartItem = user.cart.find(
      (item) => item.itemId.toString() === itemId
    );

    if (!cartItem) {
      return res.status(400).json({
        message: "Item not found in cart",
        success: false,
      });
    }

    if (cartItem.quantity <= 1) {
      return res.status(400).json({
        message: "Minimum quantity is 1",
        success: false,
      });
    }

    cartItem.quantity -= 1;
    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.itemId");

    return res.status(200).json({
      message: "Quantity decreased",
      success: true,
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
