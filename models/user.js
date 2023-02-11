const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    email:String,
    password:String,
});

const userModel=new mongoose.model("Bookuser",schema);
module.exports=userModel;