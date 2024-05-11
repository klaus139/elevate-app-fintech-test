import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { JwtPayload } from "jsonwebtoken";
import incomeModel from "../models/income.model";

interface IIncome {
  amount: number;
  category: string;
  description: string;
}

export const addIncome = CatchAsyncError(
  async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
      const { amount, description } = req.body as IIncome;

      if (amount <= 0) {
        return next(new ErrorHandler("Amount must be greater than zero", 400));
      }

      const income = await incomeModel.create({
        amount,
        description,
        user: req.user._id,
      });
      res.status(201).json({
        msg: "Success",
        income,
      });
    } catch (error: any) {
      console.error(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllIncome = CatchAsyncError(
  async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
      const income = await incomeModel
        .find().sort({createdAt:-1})
      res.status(200).json(income);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteIncome = CatchAsyncError(
  async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const income = await incomeModel.findById(id);
      if (!income) {
        return next(new ErrorHandler("income not found", 400));
      }
      if (income.user.toString() !== req.user.id) {
        return res.status(401).json({
          msg: "Not authorized",
        });
      }

      await income.deleteOne({ id });
      res.status(200).json({
        success: true,
        message: "income deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateIncome = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomeId = req.params.id;
      const { amount, description } = req.body;

      let income = await incomeModel.findById(incomeId);

      if (!income) {
        return next(new ErrorHandler("Expense not found", 404));
      }

      if (amount !== undefined) {
        income.amount = amount;
      }
      
      if (description !== undefined) {
        income.description = description;
      }

      income = await income.save();

      res
        .status(200)
        .json({ message: "Income updated successfully",income });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
