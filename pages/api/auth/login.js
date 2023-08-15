import { asyncError, errorHandler } from "../../../middleware/error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method !== "POST") return errorHandler(res, 400, "Use POST method");
  const { email, password } = req.body;

  if (!email || !password)
    return errorHandler(res, 400, "Please fill all the fields");

  try {
    await connectDB();
    const user = await User.findOne({ email }).select("+password");

    if (!user) return errorHandler(res, 400, "Invalid email or password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorHandler(res, 400, "Invalid email or password");

    const token = generateToken(user._id);
    cookieSetter(res, token, true);

    // Return the success response after successful login
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user,
    });
  } catch (err) {
    console.error(err); // Log the specific error for debugging
    return errorHandler(res, 500, "Internal Server Error");
  }
};

// Use asyncError middleware to handle errors
export default asyncError(handler);
