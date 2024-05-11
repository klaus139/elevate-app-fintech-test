import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { addIncome, deleteIncome, getAllIncome, updateIncome } from '../controllers/income.controller';

const incomeRouter = express.Router();

incomeRouter.post('/create-income', isAuthenticated, addIncome);

incomeRouter.put('/update-income/:id', isAuthenticated, updateIncome);

incomeRouter.get('/get-income', isAuthenticated,authorizeRoles('admin'), getAllIncome);

incomeRouter.delete('/delete-income/:id', isAuthenticated, deleteIncome);


export default incomeRouter;