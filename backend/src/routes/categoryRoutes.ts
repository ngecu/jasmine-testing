import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController";
import { verifyToken } from "../middlewares/verifyToken";

const category_router = Router()


category_router.post('/',verifyToken, createCategory)
category_router.get('/', getAllCategories)



export default category_router;