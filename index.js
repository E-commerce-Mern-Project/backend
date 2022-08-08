const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./models/db");


// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");



// load env variables
dotenv.config();
// connect DB
connectDB();

// routes files
const User = require("./routes/User");
const Product = require("./routes/Products");
const Cart = require('./routes/Cart');
const Order = require("./routes/Order");
const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/api/user", User);
app.use("/api/product", Product);
app.use("/api/cart" , Cart);
app.use("/api/order" , Order);

// configure swagger
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// SETTIMG PORTS
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}..`));
