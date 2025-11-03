import mongoose from "mongoose";

const savingSchema = new mongoose.Schema({
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

const SavingModel = mongoose.model("saving",savingSchema);

export default SavingModel;