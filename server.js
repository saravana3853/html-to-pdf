const express=require("express") 
const pdfroute=require("./routes/pdf.js") 
const cors = require('cors');


const bodyParser = require('body-parser');
const app=express() 

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen((5003),()=>{ 
	console.log("Server is Running") 
}) 

app.use("/",pdfroute) 
