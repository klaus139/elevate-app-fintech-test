import express, {Request, Response, NextFunction} from "express";
import expenseModel from "../models/expense.model";
import budgetModel from "../models/budget.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";

// Controller function to generate expense report
export const generateExpenseReport = CatchAsyncError(async(req:JwtPayload, res:Response, next:NextFunction) => {
    try {
        
        
        const expenses = await expenseModel.find({
            user: req.user._id

        });

      
        const totalExpenses = expenses.reduce(
            (total, expense) => total + expense.amount, 0);
            console.log(totalExpenses)

      
        const budget = await budgetModel.findOne({
            user: req.user._id
        });

      
        let remainingBudget = 0;
        if (budget) {
            const { categories } = budget;
            const budgetAmounts = categories.map(category => category.amount);
            const totalBudget = budgetAmounts.reduce((total, amount) => total + amount, 0);
            remainingBudget = totalBudget - totalExpenses;
        }

        res.json({
            totalExpenses,
            remainingBudget
        });
    } catch (err:any) {
        console.error(err.message);
        return next(new ErrorHandler(err.message, 400));
    }
})

