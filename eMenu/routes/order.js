import express from "express";
import { placeOrder, retrieveOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", placeOrder);
router.get("/order/:orderID", retrieveOrder);

export default router;
