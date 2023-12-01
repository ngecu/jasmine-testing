import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'

export  const createProduct = async (req: Request, res: Response) => {
    try {
      const product_id = v4();
      const {name,price,discount,image,category_id,countInStock,numReviews,description} = req.body
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
      .input('product_id', mssql.VarChar, product_id)
        .input('name', mssql.VarChar, name)
        .input('price', mssql.Decimal, price)
        .input('discount', mssql.Int, discount)
        .input('image', mssql.VarChar, image)
 

        .input('category_id', mssql.VarChar, category_id)
        .input('countInStock', mssql.Int,countInStock)
        .input('numReviews', mssql.Int, numReviews)
        .input('description', mssql.Text, description)
        .execute('InsertProduct');
  
        return res.status(200).json({
          message: 'Product created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


export const getProducts = async (req: Request, res: Response) => {
    try {
      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;
  
      const keyword = req.query.keyword
        ? `WHERE name LIKE '%${req.query.keyword}%'`
        : '';
  
      const pool = await mssql.connect(sqlConfig);
  
      const countResult = await pool.request().query(`SELECT COUNT(*) as count FROM products ${keyword}`);
      const count = countResult.recordset[0].count;
  
      const result = await pool.request().query(`
        SELECT * FROM (
          SELECT ROW_NUMBER() OVER (ORDER BY product_id) as row, * FROM products ${keyword}
        ) as products
        WHERE row > ${(page - 1) * pageSize} AND row <= ${page * pageSize}
      `);
  
      const products = result.recordset;
  
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const getProductById = async (req: Request, res: Response) => {
    try {
      const {product_id} = req.params
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request().input('product_id', mssql.VarChar,product_id ).query('SELECT * FROM products WHERE product_id = @product_id');
  
      if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const {product_id} = req.params

      console.log(req.params);
      
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request().input('product_id', mssql.VarChar, product_id).execute('DeleteProduct');
  
      if (result?.rowsAffected.length > 0) {
        res.json({ message: 'Product removed' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



export const updateProduct = async (req: Request, res: Response) => {
    try {
      const {product_id} = req.params
      const {name,image,category,description,discount,price,countInStock} = req.body
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('product_id', mssql.VarChar,product_id )
        .input('name', mssql.VarChar, name)
        .input('image', mssql.VarChar, image)
        .input('category_id', mssql.VarChar, category)
        .input('description', mssql.Text, description)
        .input('discount', mssql.Int, discount)
        .input('price', mssql.Decimal, price)
        .input('countInStock', mssql.Int, countInStock)
        .execute('UpdateProduct');
  
      const updatedProduct = result.recordset[0];
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const createProductReview = async (req: Request, res: Response) => {
    try {
      const { rating, comment } = req.body;
  
      const pool = await mssql.connect(sqlConfig);
  
      // Check if the product exists
      const productResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .query('SELECT * FROM products WHERE product_id = @product_id');
  
      const product = productResult.recordset[0];
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      const alreadyReviewedResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        // .input('user_id', mssql.VarChar, req.user._id)
        .query('SELECT * FROM product_reviews WHERE product_id = @product_id AND user_id = @user_id');
  
      const alreadyReviewed = alreadyReviewedResult.recordset[0];
  
      if (alreadyReviewed) {
        res.status(400).json({ error: 'Product already reviewed' });
        return;
      }

      const addReviewResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        // .input('user_id', mssql.VarChar, req.user._id)
        // .input('name', mssql.VarChar, req.user.name)
        .input('rating', mssql.Int, Number(rating))
        .input('comment', mssql.VarChar, comment)
        .execute('usp_AddProductReview');
  
      const updateProductResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .query('UPDATE products SET numReviews = (SELECT COUNT(*) FROM product_reviews WHERE product_id = @product_id), rating = (SELECT AVG(CAST(rating AS FLOAT)) FROM product_reviews WHERE product_id = @product_id) WHERE product_id = @product_id');
  
      res.status(201).json({ message: 'Review added' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const { category_id } = req.params;
  
      const pool = await mssql.connect(sqlConfig);
      const result = await pool
        .request()
        .input('category_id', mssql.VarChar(500), category_id)
        .execute('GetProductsByCategory');
  
      const products = result.recordset;
  
      if (!products || products.length === 0) {
        return res.status(404).json({ error: 'No products found for the given category' });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  