import { Router } from "express";
import {
  createProblem,
  deleteProblemById,
  getAllProblems,
  getProblemById,
  updateProblemById,
} from "../controllers/problemController.js";

const problemRoute = Router();

problemRoute.get("/", getAllProblems);
problemRoute.get("/:problemId", getProblemById);
problemRoute.post("/", createProblem);
problemRoute.put("/:problemId", updateProblemById);
problemRoute.delete("/:problemId", deleteProblemById);

export default problemRoute;
