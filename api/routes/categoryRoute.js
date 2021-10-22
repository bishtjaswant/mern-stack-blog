const express = require('express');
const catModel = require("../models/Category");
const router = express.Router();






/* 
[category lists] 
localhost:3000/api/v1/category/
*/
router.get("", async (req, res, next) => {
    try {
        
        let categories;
            categories = await catModel.find({});
       
        return  res.status(200).json({ status: true, data: { categories } });
    } catch (error) {
        console.log(error)
    }
});



/* 
[category create] 
localhost:3000/api/v1/category/create
*/
router.post("/create",async (req,res,next)=>{
try {
   const cats= new catModel(req.body);;
   cats.save();
   res.status(200).json({ status: true, data: { message: "category added" } });

} catch (error) {
    console.log(error)
}
});



module.exports=router;