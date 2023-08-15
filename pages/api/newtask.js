import { asyncError, errorHandler } from "@/middleware/error";
import { Task } from "../../models/task"; // Update the import path based on the actual file location

const { connectDB, checkAuth } = require("../../utils/features"); // Update the import path based on the actual file location

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") return errorHandler(res, 400, "Use POST method");
  await connectDB();
  const { title, description } = req.body;
  if (!title || !description)
    return errorHandler(res, 400, "Enterl all the fields");
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "Login First");
  await Task.create({
    title,
    description,
    user: user._id,
  });
  res.json({
    success: true,
  });
});

export default handler;
