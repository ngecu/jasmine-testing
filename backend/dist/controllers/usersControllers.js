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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.updateUserActiveStatus = exports.deleteUser = exports.getOneUser = exports.getAllUsers = exports.checkUserDetails = exports.loginUser = exports.registerUser = exports.dbhelper = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sqlConfig_1 = require("../config/sqlConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const validators_1 = require("../validators/validators");
exports.dbhelper = new dbhelpers_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;
        const { error } = validators_1.registerUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user_id = (0, uuid_1.v4)();
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('user_id', mssql_1.default.VarChar, user_id)
            .input('name', mssql_1.default.VarChar, name)
            .input('email', mssql_1.default.VarChar, email)
            .input('password', mssql_1.default.VarChar, hashedPwd)
            .execute('InsertUser');
        return res.status(200).json({
            message: 'User registered successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { email, password } = req.body;
        const { error } = validators_1.userLoginValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = yield (yield pool.request().input("email", email).input("password", password).execute('loginUser')).recordset;
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const CorrectPwd = yield bcrypt_1.default.compare(password, (_b = user[0]) === null || _b === void 0 ? void 0 : _b.password);
            if (!CorrectPwd) {
                return res.status(401).json({
                    error: "Incorrect password"
                });
            }
            if (((_c = user[0]) === null || _c === void 0 ? void 0 : _c.active) === 0) {
                return res.status(401).json({
                    error: "Account deactivated, please contact admin"
                });
            }
            const LoginCredentials = user.map(records => {
                const { password } = records, rest = __rest(records, ["password"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(LoginCredentials[0], process.env.SECRET);
            console.log(token);
            return res.status(200).json({
                message: "Logged in successfully", token
            });
        }
        else {
            return res.json({
                error: "Email not found"
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.loginUser = loginUser;
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        console.log(req.info);
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let users = (yield pool.request().execute('fetchAllUsers')).recordset;
        return res.status(200).json({
            users: users
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = (yield pool.request().input('user_id', id).execute('fetchOneUser')).recordset;
        return res.status(200).json({
            user: user
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getOneUser = getOneUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        console.log(user_id);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Check if the user exists before attempting deletion
        const userExists = (yield pool
            .request()
            .input('user_id', mssql_1.default.VarChar(100), user_id)
            .execute('fetchOneUser')).recordset;
        if (!userExists.length) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Delete the user
        yield pool.request().input('user_id', mssql_1.default.VarChar(100), user_id).execute('deleteUser');
        return res.status(200).json({ message: "Deleted Successfully" }); // Successful deletion, no content response
    }
    catch (error) {
        return res.status(500).json({
            error: error || 'Internal Server Error',
        });
    }
});
exports.deleteUser = deleteUser;
const updateUserActiveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.user_id;
        const { active } = req.body;
        console.log(req);
        const updateQuery = `
          UPDATE users
          SET active = @active
          WHERE user_id = @userId;
          SELECT * FROM users WHERE user_id = @userId;
        `;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('active', mssql_1.default.Int, active)
            .input('userId', mssql_1.default.VarChar(500), userId)
            .query(updateQuery);
        const updatedUser = result.recordset[0];
        // Check if any rows were affected
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user activation status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUserActiveStatus = updateUserActiveStatus;
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.user_id;
        const { name, email, password } = req.body;
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        const updateQuery = `
        UPDATE users
        SET name = '${name}',
            email = '${email}',
            password = '${password}'
        WHERE user_id = '${userId}';
      `;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request().query(updateQuery);
        const updatedUser = result.rowsAffected[0];
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: "user details updated successfully" });
    }
    catch (error) {
        console.error('Error ', error);
        res.status(500).json({ error: 'Internal server dan' });
    }
});
exports.updateUserDetails = updateUserDetails;
