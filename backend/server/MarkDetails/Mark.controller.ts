import * as express from "express";
import Item from "./MarkDetail.model";

const router = express.Router();

router.route("/").get(async (req, response) => {
  const ids = req.query.studentids as string[];
  const items = await Item.find()
    .where("studentId")
    .in(ids)
    .exec();
  return response.status(200).json(items);
});

export default router;
