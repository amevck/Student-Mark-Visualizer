import * as express from "express";
import Item from "./MarkDetail.model";

const router = express.Router();

router.route("/").get(async (_, response) => {
  const ids = Array.from({ length: 20 }, (_, i) => i + 1);
  const items = await Item.find()
    .where("studentId")
    .in(ids)
    // .where("subject")
    // .equals("Subj_1")
    .exec();
  return response.status(200).json(items);
});

export default router;
