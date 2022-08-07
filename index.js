const express = require("express");


const app = express();


const path = require("path");


const router = require("./router");




const mongoose = require("mongoose");

Database_URL = "mongodb+srv://vaibhav789:vaibhav789@cluster0.lccx2wz.mongodb.net/?retryWrites=true&w=majority";



app.use('/uploads',express.static('uploads'));

app.use(express.json());

// body parser
app.use(express.urlencoded({extended : false}));





app.use('/', router);



const port = 4000;


mongoose.connect(Database_URL,{useNewUrlParser: true,useUnifiedTopology: true },
    (error,connect)=>{
        if (error) {
            console.log('Error in database connecation ' + error);
        } 
        if(connect) {
            console.log('Database is connected');
            
        }
})


app.listen(port,()=>{
    console.log('server is running on the port ' + port);
    
})



