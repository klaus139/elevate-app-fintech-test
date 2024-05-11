import mongoose, { Document, Model, Schema } from "mongoose";

export interface IIncome extends Document {
   amount: number;
   date: Date;
   description: string;
   user: mongoose.Types.ObjectId; 
}

const incomeSchema: Schema<IIncome> = new Schema<IIncome>({
    
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
   
    date: {
        type: Date,
        trim: true
    },
   
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    user: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const incomeModel: Model<IIncome> = mongoose.model<IIncome>("Income", incomeSchema);

export default incomeModel;
