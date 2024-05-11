import mongoose, { Document, Schema, Model } from "mongoose";

export interface IExpense extends Document {
   
    amount: number;
    type: string;
    date?: Date;
    category: string;
    description:string;
    user: mongoose.Types.ObjectId[]; 
}

const expenseSchema: Schema<IExpense> = new Schema<IExpense>({
   
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
   
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
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

const expenseModel: Model<IExpense> = mongoose.model<IExpense>("Expense", expenseSchema);

export default expenseModel;
