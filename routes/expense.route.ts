import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { addExpense, deleteExpense, getAllExpense, updateExpense } from '../controllers/expense.controller';

const expenseRouter = express.Router();

expenseRouter.post('/create-expense', isAuthenticated, addExpense);

expenseRouter.put('/update-expense/:id', isAuthenticated, updateExpense);

expenseRouter.get('/get-expense', isAuthenticated,authorizeRoles("admin"), getAllExpense);

expenseRouter.delete('/delete-expense/:id', isAuthenticated, deleteExpense);


export default expenseRouter;