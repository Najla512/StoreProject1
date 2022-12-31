import express ,{Request,Response}from 'express';

import UserRoutes from'./handler/users'
import OrderRoutes from'./handler/orders'
import ProductRoutes from'./handler/products'
import bodyParser from 'body-parser';
const app:express.Application=express()
const address:string ="0.0.0.0:3000"

app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});
app.get('/',function(req:Request,res:Response){
    
    res.send("Welcome")
})
UserRoutes(app)
ProductRoutes(app)
OrderRoutes(app)

app.listen(3000,function(){
    console.log(`starting in port ${address}`)
})


export default  app;