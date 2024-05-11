import { Request, Response, NextFunction } from "express";
import expenseModel from "../models/expense.model"
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { JwtPayload } from "jsonwebtoken";

interface IExpense {
    amount:number;
    category:string;
    description:string;

}

export const addExpense = CatchAsyncError(async (req: JwtPayload, res: Response, next: NextFunction) => {
   
    try {
        const {  amount, category, description } = req.body as IExpense;

        // Validations
        if (  !category || !description || amount) {
            return next(new ErrorHandler("All fields are required", 400));
        }
        if (amount <= 0) {
            return next(new ErrorHandler("Amount must be greater than zero", 400));
        }

        const expense = await expenseModel.create({
            amount, category, description, user:req.user._id
        })
        res.status(201).json({
            msg:"Expense created",
            expense
        });
       

    } catch (error:any) {
        console.error(error);
        return next(new ErrorHandler(error.message, 400));
    }
});


export const getAllExpense = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const expense = await expenseModel.find({
            user: req.user.id
        }).sort({ date: -1 });
        res.status(200).json(expense)

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400));
    }
})


export const deleteExpense = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const {id} = req.params;
        const expense = await expenseModel.findById(id);
        if(!expense){
            return next(new ErrorHandler("expense not found", 400))
        }
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }

        await expense.deleteOne({id});
        res.status(200).json({
            success:true,
            message:"expense deleted successfully"
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400));
    }
})

