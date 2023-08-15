import { asyncError, errorHandler } from "@/middleware/error";
import { Task } from "../../models/task"; // Update the import path based on the actual file location

const { connectDB, checkAuth } = require("../../utils/features"); // Update the import path based on the actual file location

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") return errorHandler(res, 400, "Use GET method");
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "Login First");
  const tasks = await Task.find({ user: user._id });
  res.json({
    success: true,
    tasks,
  });
});

export default handler;
