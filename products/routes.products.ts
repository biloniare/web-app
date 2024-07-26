import { Router } from "express";
import productsController from "./controllers.products";

const router = Router();

router.post("/search", productsController.productSearch);

export default router;
