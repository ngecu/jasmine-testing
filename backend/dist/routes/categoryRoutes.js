"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const verifyToken_1 = require("../middlewares/verifyToken");
const category_router = (0, express_1.Router)();
category_router.post('/', verifyToken_1.verifyToken, categoryController_1.createCategory);
category_router.get('/', categoryController_1.getAllCategories);
exports.default = category_router;
