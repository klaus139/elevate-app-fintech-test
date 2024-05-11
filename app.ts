import express, { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import morgan from "morgan"
import http from 'http';
import WebSocket from 'ws';
import { ErrorMiddleWare } from './middleware/Error';
import userRouter from './routes/user.route';
import budgetRouter from './routes/budget.route';
import expenseRouter from './routes/expense.route';
import incomeRouter from './routes/income.route';
import reportRouter from './routes/report.controller';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const app = express();

const swaggerDocument = YAML.load('./swagger.yaml');



// Create HTTP server
export const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket event handling
wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket connected');

    // Handle incoming messages
    ws.on('message', (message: string) => {
        console.log('Received message:', message);
    });

    // Handle WebSocket disconnection
    ws.on('close', () => {
        console.log('WebSocket disconnected');
    });
});


import cors from 'cors';
import cookieParser from 'cookie-parser';

//body-paser
app.use(express.json({limit: '50mb'}));

//cookier-parser
app.use(cookieParser());

app.use(morgan("dev"))



app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }));
  



//routes
app.use('/api/v1', userRouter);
app.use('/api/v1', budgetRouter);
app.use('/api/v1', expenseRouter);
app.use('/api/v1', incomeRouter);
app.use('/api/v1', reportRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




//testing api
app.get('/test', (req:Request, res:Response, next:NextFunction)=> {
    res.status(200).json({
        success: true,
        message: 'API is working'
    })
})

app.all('*', (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 400;
    next(err);
})
app.use(ErrorMiddleWare);

