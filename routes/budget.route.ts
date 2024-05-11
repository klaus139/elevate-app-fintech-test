import express from 'express';

import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createBudget, deleteUserBudget, getAllBudgets, getBudget, updateUserBudget } from '../controllers/budget.controller';

const budgetRouter = express.Router();

budgetRouter.post('/create-budget', isAuthenticated, createBudget);

budgetRouter.get('/budget', isAuthenticated, getBudget);

budgetRouter.get('/all-budgets', isAuthenticated, authorizeRoles('admin'), getAllBudgets);

budgetRouter.put('/update-budget', isAuthenticated, updateUserBudget);

budgetRouter.delete('/delete-budget', isAuthenticated, deleteUserBudget);

export default budgetRouter;