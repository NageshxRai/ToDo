import { asyncError, errorHandler } from "../../../middleware/error";

import { checkAuth } from "@/utils/features";

const handler = async (req, res) => {
  if (req.method !== "GET") return errorHandler(res, 400, "Use GET method");
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 400, "Login First");
  return res.status(200).json({
    success: true,
    user,
  });
};

export default asyncError(handler);
