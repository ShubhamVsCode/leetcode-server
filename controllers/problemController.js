import mongoose from "mongoose";
import Problem from "../models/problemModel.js";
import {
  createProblemErrorMessage,
  createProblemSuccessMessage,
} from "../utils/messages.js";
import { isObjectId } from "../utils/utilFunctions.js";

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    solutions,
    constraints,
  } = req.body;

  // console.log("Create Problem", req.body);

  if (
    !title ||
    !description ||
    !difficulty ||
    examples?.length === 0 ||
    solutions?.length === 0
  ) {
    return res.status(401).json({
      message: "Please fill all the required fields!",
    });
  }

  try {
    const problem = await Problem.create({
      title,
      titleSlug: title.toLowerCase().replace(/ /g, "-"),
      description,
      difficulty,
      tags,
      examples,
      solutions,
      constraints,
    });
    return res.status(201).json({
      problem,
      message: createProblemSuccessMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message ?? createProblemErrorMessage,
    });
  }
};

export const getProblemById = async (req, res) => {
  const { problemId } = req.params;

  if (!problemId) {
    return res.status(404).json({
      message: "Please give a problem id or title",
    });
  }

  try {
    console.log(problemId);
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      problem,
      message: "Problem found!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to find problem",
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}, "title difficulty tags");

    return res.status(200).json({
      problems,
      message: "All Problems",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to find problems",
    });
  }
};

export const updateProblemById = async (req, res) => {
  const { problemId } = req.params;

  if (!problemId) {
    return res.status(404).json({
      message: "Please give a problem id or title for updating the problem",
    });
  }

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    solutions,
    constraints,
  } = req.body;

  try {
    // const problem = await Problem.findByIdOrTitle(problemId);
    const problem = await Problem.findByIdAndUpdate(
      problemId,
      {
        title: title,
        description: description,
        difficulty: difficulty,
        tags: tags,
        constraints: constraints,
        examples: examples,
        solutions: solutions,
      },
      {
        new: true,
      }
    );

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      message: "Updated successfully",
      problem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating problem",
    });
  }
};

export const deleteProblemById = async (req, res) => {
  const { problemId } = req.params;

  if (!problemId) {
    return res.status(404).json({
      message: "Please give a problem id or title for deleting the problem",
    });
  }

  try {
    const deletedProblem = await Problem.findByIdAndDelete(problemId);
    return res.json({
      message: "Problem deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting problem",
    });
  }
};
