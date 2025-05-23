import express from "express";
import { getRecipes } from "../controllers/recipeController.js";

const router = express.Router();

router.get("/recipes", getRecipes);

export default router;
