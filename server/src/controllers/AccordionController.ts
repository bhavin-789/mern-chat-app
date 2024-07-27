import { Request, Response } from "express";
import AccordionModel from "../models/AccordionModal";

export const getAccordions = async (req: any, res: Response) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    const accordions = await AccordionModel.find({}).limit(limit).skip(skip);
    const totalCounts = await AccordionModel.countDocuments();
    return res.status(200).json({ accordions, totalCounts });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while fetching all the accordions", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const createAccordion = async (req: Request, res: Response) => {
  try {
    const { questionInput, answerInput } = req.body;
    const newAccordion = await AccordionModel.create({
      question: questionInput,
      answer: answerInput,
    });
    return res.status(201).json({ newAccordion });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while creating the accordion", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const deleteAccordion = async (req: Request, res: Response) => {
  try {
    const { accordionId } = req.params;
    const deletedAccordion = await AccordionModel.findByIdAndDelete(
      accordionId
    );
    return res.status(200).json({ deletedAccordion });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while deleting the accordion", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const editAccordion = async (req: Request, res: Response) => {
  try {
    const { accordionId } = req.params;
    const { questionInput, answerInput } = req.body;
    const editedAccordion = await AccordionModel.findByIdAndUpdate(
      accordionId,
      {
        question: questionInput,
        answer: answerInput,
      },
      { new: true }
    );
    return res.status(200).json({ editedAccordion });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while editing the accordion", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
