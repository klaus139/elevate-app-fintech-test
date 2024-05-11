import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBudget extends Document {
   user: mongoose.Types.ObjectId; 
   categories: {
       name: string;
       amount: number;
   }[];
}

const budgetSchema: Schema<IBudget> = new Schema<IBudget>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    categories: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true });

const budgetModel: Model<IBudget> = mongoose.model<IBudget>("Budget", budgetSchema);

export default budgetModel;
