
import mssql from "mssql";
import { createProduct } from "./productsController";
import { Request } from "express";
import { assert } from "joi";
import { v4 } from "uuid";

// jest.mock("uuid", () => ({
// v4: jest.fn(),
// }));

describe("Create product test",()=>{
    let req: any;
    let res:any;

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })
    it("adds products successfully", async ()=>{
        req = {
          body: {
            productName: "Harry Porter",
            productDescription:
              "Explore breathtaking landscapes and exciting activities.",
            productPrice: 5000,
            productCategory: "Electronics",
            productImage:
              "https://m.media-amazon.com/images/I/61k7JqSWOUL._SY425_.jpg",
            supplierContact: "Penguin",
            Quantity: 20,
          },
        };


        const mockedInput = jest.fn().mockReturnThis()

        const mockExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

        const mockedRequest = {
          input: mockedInput,
          execute: mockExecute,
        };

            const mockedPool = {
              request: jest.fn().mockReturnValue(mockedRequest),
            };

  jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

  await createProduct(req as Request,res as never)


   const mockedV4 = jest.requireMock("uuid").v4;

   mockedV4.mockImplementation(() => "uniqueid_dskjfgkjhf_dfkjgsj");

   console.log(v4()); 
   
        
  expect(res.json).toHaveBeenCalledWith({
    message: "Product created successfully"
  });
    expect(res.status).toHaveBeenCalledWith(200);

    });

}) 