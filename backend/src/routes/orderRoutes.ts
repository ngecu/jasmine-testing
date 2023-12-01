import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createOrder, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from "../controllers/ordersController";

const order_router = Router()


order_router.route('/').post(createOrder).get(verifyToken, getOrders)
order_router.route('/myorders/:user_id').get(verifyToken, getMyOrders)
order_router.route('/:id').get(verifyToken, getOrderById)
order_router.route('/:id/pay').put(verifyToken, updateOrderToPaid)
order_router.route('/:id/deliver').put(verifyToken, updateOrderToDelivered)

export default order_router;