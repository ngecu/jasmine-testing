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
exports.getProductsByCategory = exports.createProductReview = exports.updateProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const sqlConfig_1 = require("../config/sqlConfig");
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = (0, uuid_1.v4)();
        const { name, price, discount, image, category_id, countInStock, numReviews, description } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .input('name', mssql_1.default.VarChar, name)
            .input('price', mssql_1.default.Decimal, price)
            .input('discount', mssql_1.default.Int, discount)
            .input('image', mssql_1.default.VarChar, image)
            .input('category_id', mssql_1.default.VarChar, category_id)
            .input('countInStock', mssql_1.default.Int, countInStock)
            .input('numReviews', mssql_1.default.Int, numReviews)
            .input('description', mssql_1.default.Text, description)
            .execute('InsertProduct');
        return res.status(200).json({
            message: 'Product created successfully',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword
            ? `WHERE name LIKE '%${req.query.keyword}%'`
            : '';
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const countResult = yield pool.request().query(`SELECT COUNT(*) as count FROM products ${keyword}`);
        const count = countResult.recordset[0].count;
        const result = yield pool.request().query(`
        SELECT * FROM (
          SELECT ROW_NUMBER() OVER (ORDER BY product_id) as row, * FROM products ${keyword}
        ) as products
        WHERE row > ${(page - 1) * pageSize} AND row <= ${page * pageSize}
      `);
        const products = result.recordset;
        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request().input('product_id', mssql_1.default.VarChar, product_id).query('SELECT * FROM products WHERE product_id = @product_id');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getProductById = getProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        console.log(req.params);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request().input('product_id', mssql_1.default.VarChar, product_id).execute('DeleteProduct');
        if ((result === null || result === void 0 ? void 0 : result.rowsAffected.length) > 0) {
            res.json({ message: 'Product removed' });
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const { name, image, category, description, discount, price, countInStock } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('product_id', mssql_1.default.VarChar, product_id)
            .input('name', mssql_1.default.VarChar, name)
            .input('image', mssql_1.default.VarChar, image)
            .input('category_id', mssql_1.default.VarChar, category)
            .input('description', mssql_1.default.Text, description)
            .input('discount', mssql_1.default.Int, discount)
            .input('price', mssql_1.default.Decimal, price)
            .input('countInStock', mssql_1.default.Int, countInStock)
            .execute('UpdateProduct');
        const updatedProduct = result.recordset[0];
        res.json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateProduct = updateProduct;
const createProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, comment } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Check if the product exists
        const productResult = yield pool.request()
            .input('product_id', mssql_1.default.VarChar, req.params.id)
            .query('SELECT * FROM products WHERE product_id = @product_id');
        const product = productResult.recordset[0];
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        const alreadyReviewedResult = yield pool.request()
            .input('product_id', mssql_1.default.VarChar, req.params.id)
            // .input('user_id', mssql.VarChar, req.user._id)
            .query('SELECT * FROM product_reviews WHERE product_id = @product_id AND user_id = @user_id');
        const alreadyReviewed = alreadyReviewedResult.recordset[0];
        if (alreadyReviewed) {
            res.status(400).json({ error: 'Product already reviewed' });
            return;
        }
        const addReviewResult = yield pool.request()
            .input('product_id', mssql_1.default.VarChar, req.params.id)
            // .input('user_id', mssql.VarChar, req.user._id)
            // .input('name', mssql.VarChar, req.user.name)
            .input('rating', mssql_1.default.Int, Number(rating))
            .input('comment', mssql_1.default.VarChar, comment)
            .execute('usp_AddProductReview');
        const updateProductResult = yield pool.request()
            .input('product_id', mssql_1.default.VarChar, req.params.id)
            .query('UPDATE products SET numReviews = (SELECT COUNT(*) FROM product_reviews WHERE product_id = @product_id), rating = (SELECT AVG(CAST(rating AS FLOAT)) FROM product_reviews WHERE product_id = @product_id) WHERE product_id = @product_id');
        res.status(201).json({ message: 'Review added' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createProductReview = createProductReview;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool
            .request()
            .input('category_id', mssql_1.default.VarChar(500), category_id)
            .execute('GetProductsByCategory');
        const products = result.recordset;
        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No products found for the given category' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getProductsByCategory = getProductsByCategory;
