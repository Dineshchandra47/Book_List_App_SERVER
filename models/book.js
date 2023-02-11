const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const schema=new mongoose.Schema({
    title:String,
    isbn:String,
    author:String,
    description:String,
    publisher:String,
    publishedDate:String, 
    user: {type: Schema.Types.ObjectId, ref: "Bookuser"}
});


const bookModel=new mongoose.model("Booklist",schema);
module.exports=bookModel;