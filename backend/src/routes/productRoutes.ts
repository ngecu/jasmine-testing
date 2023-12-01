import express, { Router } from 'express'
import { verifyToken } from "../middlewares/verifyToken";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getProductsByCategory, updateProduct } from '../controllers/productsController.js';

const product_router = Router()

product_router.post('/',verifyToken, createProduct)
product_router.get('/', getProducts)


product_router.post('/:id/reviews',verifyToken, createProductReview)
product_router.get('/:product_id',getProductById)
product_router.delete("/:product_id",verifyToken,deleteProduct)
product_router.put("/:product_id",verifyToken,updateProduct)
product_router.get('/category/:category_id',getProductsByCategory)




export default product_router;