import express, { json } from "express";
// import { testConnection } from "./config/sqlConfig";
import cors from 'cors'
import user_router from "./routes/userRoutes";
import category_router from "./routes/categoryRoutes";
import product_router from "./routes/productRoutes";
import order_router from "./routes/orderRoutes";

const app = express();

app.use(cors())
app.use(json())

// app.use("/", () => {
//   console.log("api is working");
// });

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/user', user_router)
app.use('/product', product_router)
app.use('/order', order_router)
app.use('/category', category_router)







const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);

});
