import { asyncError, errorHandler } from "@/middleware/error";
import { Task } from "../../../models/task"; // Update the import path based on the actual file location

const { connectDB, checkAuth } = require("../../../utils/features"); // Update the import path based on the actual file location

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "Login First");
  const taskId = req.query.id;
  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 400, "Task Not Found");
  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "Task Update Successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    return errorHandler(res, 400, "Method not available");
  }

  // The code block below was originally outside the if-else statement,
  // it is now moved inside the PUT method block.
});

export default handler;
