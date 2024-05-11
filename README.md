Finance Budget Backend Application
This backend application is designed to help users organize their finances by providing functionalities to manage budgets, expenses, and income.

This application was built using NodeJS Typescript MVC architecture.
It runs on an express server

Follow these instructions to set up and run the application locally:

Clone the Repository:

bash
Copy code
git clone https://github.com/klaus139/elevate-app-fintech-test.git

Install Dependencies:

bash
Copy code
cd elevate-app-fintech-test

I used Yarn as a node manager so  run

yarn

to install the node dependecies

Environment Variables:

Create a .env file in the root directory and add the necessary environment variables, including database connection details, JWT secret, and any other required configurations.



Functionality
The application offers the following functionalities:

Authentication: Users can register using email and password. Users will be provided a one time OTP using email service valid for 15 minutes with which they can validate their registration before being granted access to the application.

Users are divided int Admin and User. With Admin have access to protected routes and more resources within the application.

Budget Management: Users can create, update, and delete budget categories with specific amounts allocated to each category.
Expense Management: Users can add, retrieve, update, and delete expenses. Expenses are categorized and can include descriptions.
Income Management: Users can add and retrieve income entries to track their earnings.
Expense Reporting: Users can generate reports that provide insights into their total expenses and remaining budget.

Run the Application:

npm run dev

Testing:

Run tests to ensure the application is working correctly:

npm test
Access API Documentation:

Once the application is running, access the Swagger API documentation at /api-docs to view detailed information about available endpoints and their functionalities.

API Endpoints
Budget Management
Create Budget: POST /api/v1/budget
Get Budget: GET /api/v1/budget
Get All Budgets: GET /api/v1/budget/all
Update Budget: PUT /api/v1/budget
Delete Budget: DELETE /api/v1/budget
Expense Management
Add Expense: POST /api/v1/expense
Get All Expenses: GET /api/v1/expense
Update Expense: PUT /api/v1/expense/:id
Delete Expense: DELETE /api/v1/expense/:id
Income Management
Add Income: POST /api/v1/income
Get All Income Entries: GET /api/v1/income
Expense Reporting
Generate Expense Report: GET /api/v1/report/expense
Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT for authentication
Swagger for API documentation


Contributors
Nicholas Igunbor

License
This project is licensed under the MIT License.

I also included a hosted link to the documentation on postman
https://documenter.getpostman.com/view/23837331/2sA3JM8hH2

Link to architecture Board 
https://whimsical.com/elevate-finance-tracker-Gh1wrG6M5efKp1mjCUMVSK@or4CdLRbgroMw7kW89kKZWdXG5YKzVTfEcC9ZiiZn

