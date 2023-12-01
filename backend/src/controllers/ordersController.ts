import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from'uuid';



  export const createOrder = async (req:Request, res:Response) => {
    console.log(req.body);
    try {
      const {
        product_id,
        first_name,
        last_name,
        phone_number,
        email_address,
        cartItemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        shippingAddress,
        receipt,
        user_id,
        is_paid,
        paid_at,
        is_delivered,
        delivered_at,
        created_at,
        cartItems
      } = req.body;
        

  

        const pool = await mssql.connect(sqlConfig);
        const order_id = v4()
        cartItems.forEach(async (item:any) => {
        
        console.log(order_id);
        

        const result = pool.request()
        .input('order_id', mssql.VarChar, order_id) 
        .input('product_id', mssql.VarChar, item.product_id)
        .input('first_name', mssql.VarChar, first_name)
        .input('last_name', mssql.VarChar, last_name)
        .input('phone_number', mssql.VarChar, phone_number)
        .input('email_address', mssql.VarChar, email_address)
        .input('cartItemsPrice', mssql.Decimal(10, 2), ((item.price - item.discount) * item.qty)  )
        .input('shippingPrice', mssql.Decimal(10, 2), shippingPrice)
        .input('taxPrice', mssql.Decimal(10, 2), taxPrice)
        .input('totalPrice', mssql.Decimal(10, 2), totalPrice)
        .input('shippingAddress', mssql.VarChar, shippingAddress)
        .input('receipt', mssql.VarChar, receipt)
        .input('user_id', mssql.VarChar, user_id)
        .input('is_paid', mssql.Int, is_paid)
        .input('paid_at', mssql.VarChar, paid_at)
        .input('is_delivered', mssql.Int, is_delivered)
        .input('delivered_at', mssql.VarChar, delivered_at)
        .input('created_at', mssql.VarChar, created_at)
        .execute('AddOrder')
        
      
        });

        return res.status(200).json({
          message: 'Order Created successfully',
      });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

  
export  const getOrderById = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('order_id', mssql.VarChar, req.params.id)
        .query('SELECT * FROM orders WHERE order_id = @order_id');
  
      const order = result.recordset[0];
  
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const updateOrderToPaid = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('order_id', mssql.VarChar, req.params.id)
        .input('payment_id', mssql.VarChar, req.body.id)
        .input('payment_status', mssql.VarChar, req.body.status)
        .input('update_time', mssql.VarChar, req.body.update_time)
        .input('email_address', mssql.VarChar, req.body.payer.email_address)
        .execute('usp_UpdateOrderToPaid');
  
      const updatedOrder = result.recordset[0];
  
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export  const getMyOrders = async (req: Request, res: Response) => {
    try {
      console.log(req.params);
      
      const {user_id} = req.params

      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .query('SELECT * FROM orders WHERE user_id = @user_id');
  
      const orders = result.recordset;
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const getOrders = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .query('SELECT * FROM orders');
  
      const orders = result.recordset;
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const updateOrderToDelivered = async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('order_id', mssql.VarChar, id)
        .execute('UpdateOrderToDelivered');
  
      const updatedOrder = result.recordset[0];
  
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  