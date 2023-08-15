import { asyncError, errorHandler } from "../../../middleware/error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method !== "POST") return errorHandler(res, 400, "Use POST method");
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return errorHandler(res, 400, "Please fill all the fields");

  try {
    await connectDB();
    let user = await User.findOne({ email });

    if (user)
      return errorHandler(
        res,
        400,
        "User is already registered with this email"
      );
    const hashedPass = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    const token = generateToken(user._id);
    cookieSetter(res, token, true);

    // Return the success response after successful registration
    return res.status(200).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (err) {
    // Handle any unexpected errors by calling the errorHandler function
    return errorHandler(res, 500, "Internal Server Error");
  }
};

// Use asyncError middleware to handle errors
export default asyncError(handler);
