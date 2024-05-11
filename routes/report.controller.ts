import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { generateExpenseReport } from '../controllers/report.controller';

const reportRouter = express.Router();

reportRouter.get('/report', isAuthenticated, generateExpenseReport);

export default reportRouter;