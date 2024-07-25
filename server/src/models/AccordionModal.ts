import mongoose from "mongoose";

const accordionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AccordionModel = mongoose.model("Accordion", accordionSchema);
export default AccordionModel;
