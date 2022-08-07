


const express = require('express');

const courseModel = require('./Models/course')

const router = express.Router();

const upload = require('./Middlewaares/upload')



router.get("/", (req, res, next) =>

        courseModel.find()
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(error=>{
            res.send(error);
        })
});



router.post("/addCourse", upload.fields([ 
    {name :'imgURL' , maxCount:1} ,
    { name :'Certificate' , maxCount:1} 
 ]) ,  (req,res) => {


    const {
        name,
        imgURL,
        University_name,
        linkedin_URL,
        learning_time,
        price,
        Certificate,
        eligibility_criteria
    } =   req.body;

   


    const newCourse = new courseModel ({ 
        name :name  ,
        imgURL:imgURL ,
        University_name :University_name ,
        linkedin_URL :linkedin_URL  ,
        learning_time :learning_time ,
        price:price ,
        Certificate :Certificate  ,
        eligibility_criteria:eligibility_criteria 
    })

       
        


    if (req.files) {

        
        newCourse.imgURL = req.files.imgURL[0].path;
        newCourse.Certificate = req.files.Certificate[0].path;


    }
    
    
    newCourse.save().then(
        data=>{
            console.log(data);
                        
            res.json({ upload:"Data Uploaded sucessfully" ,
                data:data});
            
        }
    )
    .catch(
        err=>{
            res.json(err);
            
        }
    )
    





});



router.patch("/updateCourse/:id", (req, res, next) => {



    // res.send(req.params.id)

    const {
        name,
        imgURL,
        University_name,
        linkedin_URL,
        learning_time,
        price,
        Certificate,
        eligibility_criteria
    } =   req.body;



    try {





      const result =   courseModel.findByIdAndUpdate(req.params.id,
        req.body

        
        
        
        )
        



        res.send(result)
    } catch (error) {
        
    }

   
   

});



router.delete("/deleteCourse/:id", (req, res, next) => {

    courseModel.findByIdAndDelete({_id:userId},(err,result)=>{
        if (!result) {
            res.status(404).json({err:err})
        }else{
            res.status(200).json({message:'User Deleted',res:result})
        }
    })
    

});















module.exports = router;








