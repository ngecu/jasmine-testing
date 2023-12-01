import { Request } from 'express';
import mssql from 'mssql'
import { createCategory } from './categoryController';

describe("Category", () => {
    let res: any;
  
    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
    });
  
  
    it("Creates Order", async () => {
      const req = {
        body: {
            category_name:"Applicances",
            category_description:"Category Description",
            category_image:"Image"
        },
      };
  
  
      const mockedInput = jest.fn().mockReturnThis();
  
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
  
      const mockedRequest = {
        input: mockedInput,
        execute: mockedExecute,
      };
  
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest),
      };
  
      jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);
  
      await createCategory(req as Request, res as never);
  
          expect(res.json).toHaveBeenCalledWith({
            message: "Category created successfully",
          });
          expect(res.status).toHaveBeenCalledWith(200)
    });
    
    
  
  });