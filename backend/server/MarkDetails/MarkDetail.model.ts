import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../../types";

// Declare model interface
interface MarkDetailDoc extends MarkDetail, Document {}

const itemSchemaDef: SchemaDef<MarkDetail> = {
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  studentId: {
    type: Number,
    required: true,
    index: true,
  },
};

// Define model schema
const itemSchema = new Schema(itemSchemaDef);

export default model<MarkDetailDoc>("MarkDetail", itemSchema);
