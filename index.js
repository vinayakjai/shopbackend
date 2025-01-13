const express=require("express");
const callDb = require("./dbconfig");
const bodyParser=require("body-parser");
const cors=require("cors");
const router = require("./routes");
const stockRouter=require("./routes/stock")
const cartRouter=require("./routes/cart")
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin:"https://myhomeshopxyz123.netlify.app"

}))

//"https://myhomeshopxyz123.netlify.app"


callDb();
app.use(router);
app.use('/stock',stockRouter);
app.use('/cart',cartRouter);
app.listen(3100,()=>{
    console.log(`server is listening on http://localhost:${3100}`);

})
