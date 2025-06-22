const express=require("express");
const callDb = require("./dbconfig");
const bodyParser=require("body-parser");
const cors=require("cors");
const router = require("./routes");
const stockRouter=require("./routes/stock")
const cartRouter=require("./routes/cart");
const coldStorageRouter=require("./routes/cold_storage")
const customerRouter=require("./routes/customer_info");
const dashboard_router = require("./routes/dashboard");
const sales_router=require("./routes/sales")
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin:"https://myhomeshopxyz123.netlify.app/"

}))

//"https://myhomeshopxyz123.netlify.app"


callDb();
app.use(router);
app.use('/sal',sales_router)
app.use('/stock',stockRouter);
app.use('/cart',cartRouter);
app.use('/cold',coldStorageRouter)
app.use('/customer',customerRouter)
app.use('/dashboard',dashboard_router)
app.listen(3100,"0.0.0.0",()=>{
    console.log(`server is listening on http://localhost:${3100}`)
})



