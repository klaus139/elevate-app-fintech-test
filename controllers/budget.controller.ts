import { Request, Response, NextFunction } from "express";
import budgetModel, { IBudget } from "../models/budget.model";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { JwtPayload } from "jsonwebtoken";

export const createBudget = CatchAsyncError(async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const { categories } = req.body as IBudget;


        if (!categories || !Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ message: "Categories array is required and should not be empty" });
        }


        const newBudget = {
            user: req.user._id,
            categories: categories.map((category: { name: string; amount: number }) => ({
                name: category.name,
                amount: category.amount
            }))
        };

 
        const createdBudget = await budgetModel.create(newBudget);


        res.status(201).json({ message: "Categories created successfully", budget: createdBudget });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const getBudget = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const budget = await budgetModel.findOne({
            user: req.user._id
        });

        if (!budget) {
            return res.status(404).json({
                msg: 'Budget not found'
            });
        }

        res.json(budget);

    }catch(error:any){
        return next(new ErrorHandler("Internal Server Error", 500));

    }
})

export const getAllBudgets = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const budgets = await budgetModel.find()

        if (!budgets) {
            return res.status(404).json({
                msg: 'Budget not found'
            });
        }

        res.json(budgets);

    }catch(error:any){
        return next(new ErrorHandler("Internal Server Error", 500));

    }
})



export const updateUserBudget = CatchAsyncError(async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const { categories } = req.body;
        const userId = (req.user as JwtPayload)._id;

        let budget = await budgetModel.findOne({ user: userId });

        if (!budget) {
            return next(new ErrorHandler("Invalid resource", 400));
        }

        budget.categories = categories;
        await budget.save();

        return res.json(budget);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


export const deleteUserBudget = CatchAsyncError(async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user as JwtPayload)._id;


        const budget = await budgetModel.findOne({ user: userId });


        if (!budget) {
            return next(new ErrorHandler("User budget not found", 404));
        }

  
        await budgetModel.deleteOne({ user: userId });

       
        res.status(200).json({ message: "User budget deleted successfully" });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});