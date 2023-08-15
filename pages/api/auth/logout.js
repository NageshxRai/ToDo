import { asyncError, errorHandler } from "../../../middleware/error";

import { cookieSetter } from "@/utils/features";

const handler = async (req, res) => {
  if (req.method !== "GET") return errorHandler(res, 400, "Use GET method");

  cookieSetter(res, null, false);

  // Return the success response after successful login
  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};

// Use asyncError middleware to handle errors
export default asyncError(handler);
