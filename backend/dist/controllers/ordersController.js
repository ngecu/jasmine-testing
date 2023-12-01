"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderToDelivered = exports.getOrders = exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.createOrder = void 0;
const sqlConfig_1 = require("../config/sqlConfig");
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { product_id, first_name, last_name, phone_number, email_address, cartItemsPrice, shippingPrice, taxPrice, totalPrice, shippingAddress, receipt, user_id, is_paid, paid_at, is_delivered, delivered_at, created_at, cartItems } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const order_id = (0, uuid_1.v4)();
        cartItems.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(order_id);
            const result = pool.request()
                .input('order_id', mssql_1.default.VarChar, order_id)
                .input('product_id', mssql_1.default.VarChar, item.product_id)
                .input('first_name', mssql_1.default.VarChar, first_name)
                .input('last_name', mssql_1.default.VarChar, last_name)
                .input('phone_number', mssql_1.default.VarChar, phone_number)
                .input('email_address', mssql_1.default.VarChar, email_address)
                .input('cartItemsPrice', mssql_1.default.Decimal(10, 2), ((item.price - item.discount) * item.qty))
                .input('shippingPrice', mssql_1.default.Decimal(10, 2), shippingPrice)
                .input('taxPrice', mssql_1.default.Decimal(10, 2), taxPrice)
                .input('totalPrice', mssql_1.default.Decimal(10, 2), totalPrice)
                .input('shippingAddress', mssql_1.default.VarChar, shippingAddress)
                .input('receipt', mssql_1.default.VarChar, receipt)
                .input('user_id', mssql_1.default.VarChar, user_id)
                .input('is_paid', mssql_1.default.Int, is_paid)
                .input('paid_at', mssql_1.default.VarChar, paid_at)
                .input('is_delivered', mssql_1.default.Int, is_delivered)
                .input('delivered_at', mssql_1.default.VarChar, delivered_at)
                .input('created_at', mssql_1.default.VarChar, created_at)
                .execute('AddOrder');
        }));
        return res.status(200).json({
            message: 'Order Created successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
exports.createOrder = createOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('order_id', mssql_1.default.VarChar, req.params.id)
            .query('SELECT * FROM orders WHERE order_id = @order_id');
        const order = result.recordset[0];
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getOrderById = getOrderById;
const updateOrderToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('order_id', mssql_1.default.VarChar, req.params.id)
            .input('payment_id', mssql_1.default.VarChar, req.body.id)
            .input('payment_status', mssql_1.default.VarChar, req.body.status)
            .input('update_time', mssql_1.default.VarChar, req.body.update_time)
            .input('email_address', mssql_1.default.VarChar, req.body.payer.email_address)
            .execute('usp_UpdateOrderToPaid');
        const updatedOrder = result.recordset[0];
        if (updatedOrder) {
            res.json(updatedOrder);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const { user_id } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('user_id', mssql_1.default.VarChar, user_id)
            .query('SELECT * FROM orders WHERE user_id = @user_id');
        const orders = result.recordset;
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMyOrders = getMyOrders;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .query('SELECT * FROM orders');
        const orders = result.recordset;
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getOrders = getOrders;
const updateOrderToDelivered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('order_id', mssql_1.default.VarChar, id)
            .execute('UpdateOrderToDelivered');
        const updatedOrder = result.recordset[0];
        if (updatedOrder) {
            res.json(updatedOrder);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateOrderToDelivered = updateOrderToDelivered;
