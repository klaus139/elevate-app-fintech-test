import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { JwtPayload } from "jsonwebtoken";
import incomeModel from "../models/income.model";

interface IIncome {
    amount:number;
    category:string;
    description:string;

}

export const addIncome = CatchAsyncError(async (req: JwtPayload, res: Response, next: NextFunction) => {
   
    try {
        const {  amount, category, description } = req.body as IIncome;

        // Validations
        if (  !category || !description || amount) {
            return next(new ErrorHandler("All fields are required", 400));
        }
        if (amount <= 0) {
            return next(new ErrorHandler("Amount must be greater than zero", 400));
        }

        const income = await incomeModel.create({
            amount, category, description, user:req.user._id
        })
        res.status(201).json({
            msg:"Success",
            income
        });
       

    } catch (error:any) {
        console.error(error);
        return next(new ErrorHandler(error.message, 400));
    }
});


export const getAllIncome = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const income = await incomeModel.find({
            user: req.user.id
        }).sort({ date: -1 });
        res.status(200).json(income)

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400));
    }
})


export const deleteIncome = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const {id} = req.params;
        const income = await incomeModel.findById(id);
        if(!income){
            return next(new ErrorHandler("income not found", 400))
        }
        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }

        await income.deleteOne({id});
        res.status(200).json({
            success:true,
            message:"income deleted successfully"
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400));
    }
})

