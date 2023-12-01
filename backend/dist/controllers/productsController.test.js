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
const mssql_1 = __importDefault(require("mssql"));
const productsController_1 = require("./productsController");
const uuid_1 = require("uuid");
// jest.mock("uuid", () => ({
// v4: jest.fn(),
// }));
describe("Create product test", () => {
    let req;
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    it("adds products successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        req = {
            body: {
                productName: "Harry Porter",
                productDescription: "Explore breathtaking landscapes and exciting activities.",
                productPrice: 5000,
                productCategory: "Electronics",
                productImage: "https://m.media-amazon.com/images/I/61k7JqSWOUL._SY425_.jpg",
                supplierContact: "Penguin",
                Quantity: 20,
            },
        };
        const mockedInput = jest.fn().mockReturnThis();
        const mockExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockExecute,
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest),
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValue(mockedPool);
        yield (0, productsController_1.createProduct)(req, res);
        const mockedV4 = jest.requireMock("uuid").v4;
        mockedV4.mockImplementation(() => "uniqueid_dskjfgkjhf_dfkjgsj");
        console.log((0, uuid_1.v4)());
        expect(res.json).toHaveBeenCalledWith({
            message: "Product created successfully"
        });
        expect(res.status).toHaveBeenCalledWith(200);
    }));
});
