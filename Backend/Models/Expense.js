import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  description:{
    type:String,
    required: true,
  },
  amount: {
    type:Number,
    required:true,
    min:0
  }
},
{ timestamps: true })

const ExpenseModel = mongoose.model("expenses",expenseSchema);

export default ExpenseModel;