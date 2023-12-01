import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'

export const createCategory = async (req: Request, res: Response) => {
    try {
        const {category_name,category_description,category_image} = req.body
        const category_id = v4();
        console.log(req.body);
        
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('category_id', mssql.VarChar, category_id)
        .input('category_name', mssql.VarChar, category_name)
        .input('category_description', mssql.VarChar, category_description)
        .input('category_image', mssql.VarChar, category_image)

        
        .execute('InsertCategory');
  
      const createdCategory = result.rowsAffected[0] ;
      if (!createdCategory) {
        return res.status(404).json({ error: "error" });
      }
  
      res.status(200).json({message:"Category created successfully"});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };
  
  export const getAllCategories = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request().query('SELECT * FROM categories');
  
      const categories = result.recordset;
  
      if (!categories || categories.length === 0) {
        return res.status(404).json({ error: 'No categories found' });
      }
  
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  