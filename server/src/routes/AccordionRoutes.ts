import { Router } from "express";
import {
  createAccordion,
  deleteAccordion,
  editAccordion,
  getAccordions,
} from "../controllers/AccordionController";
import { verifyToken } from "../middlewares/AuthMiddleware";

const accordionRoutes = Router();

accordionRoutes.get("/get-accordions", verifyToken, getAccordions);
accordionRoutes.post("/create-accordion", verifyToken, createAccordion);
accordionRoutes.delete(
  "/delete-accordion/:accordionId",
  verifyToken,
  deleteAccordion
);
accordionRoutes.put("/edit-accordion/:accordionId", verifyToken, editAccordion);

export default accordionRoutes;
