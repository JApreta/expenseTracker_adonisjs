/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example

|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.group(() => {
    Route.get("/expensecategory", "ExpenseCategoriesController.index");
    Route.get("/expensecategory/:id", "ExpenseCategoriesController.show");
    Route.post("/expensecategory", "ExpenseCategoriesController.store");
    Route.patch("/expensecategory/:id", "ExpenseCategoriesController.update");
    Route.delete("/expensecategory/:id", "ExpenseCategoriesController.destroy");
  }).prefix("api");

  Route.group(() => {
    Route.get("/getall", "IncomeCategoriesController.index");
    Route.get("/getone/:id", "IncomeCategoriesController.show");
    Route.post("/new", "IncomeCategoriesController.store");
    Route.patch("/update/:id", "IncomeCategoriesController.update");
    Route.delete("/remove/:id", "IncomeCategoriesController.destroy");
  }).prefix("api/incomecategory");

  Route.group(() => {
    Route.get("/getall", "SavingsCategoriesController.index");
    Route.get("/getone/:id", "SavingsCategoriesController.show");
    Route.post("/new", "SavingsCategoriesController.store");
    Route.patch("/update/:id", "SavingsCategoriesController.update");
    Route.delete("/remove/:id", "SavingsCategoriesController.destroy");
  }).prefix("api/savingscategory");

  Route.group(() => {
    Route.get("/getall", "SavingsGoalsController.index");
    Route.get("/getone/:user_email", "SavingsGoalsController.show");
    Route.get(
      "/getallbyuser/:user_email",
      "SavingsGoalsController.showAllByUser"
    );
    Route.post("/new", "SavingsGoalsController.store");
    Route.patch("/update/:id", "SavingsGoalsController.update");
    Route.delete("/remove/:id", "SavingsGoalsController.destroy");
  }).prefix("api/savingsgoal");

  Route.group(() => {
    Route.get("/getone/", "BudgetsController.show");
    Route.get("/getall", "BudgetsController.showAllByUser");
    Route.post("/new", "BudgetsController.store");
    Route.patch("/update/:id", "BudgetsController.update");
    Route.delete("/remove/:id", "BudgetsController.destroy");
  }).prefix("api/budget");

  Route.group(() => {
    Route.get("/getone/", "ExpenseTransactionsController.show");
    Route.get("/getall", "ExpenseTransactionsController.showAllByUser");
    Route.post("/new", "ExpenseTransactionsController.store");
    Route.patch("/update/:id", "ExpenseTransactionsController.update");
    Route.delete("/remove/:id", "ExpenseTransactionsController.destroy");
  }).prefix("api/expensetransaction");

  Route.group(() => {
    Route.get("/getone/", "IncomeTransactionsController.show");
    Route.get("/getall", "IncomeTransactionsController.showAllByUser");
    Route.post("/new", "IncomeTransactionsController.store");
    Route.patch("/update/:id", "IncomeTransactionsController.update");
    Route.delete("/remove/:id", "IncomeTransactionsController.destroy");
  }).prefix("api/incometransaction");

  Route.group(() => {
    Route.get("/getone/", "SavingsTransactionsController.show");
    Route.get("/getall", "SavingsTransactionsController.showAllByUser");
    Route.post("/new", "SavingsTransactionsController.store");
    Route.patch("/update/:id", "SavingsTransactionsController.update");
    Route.delete("/remove/:id", "SavingsTransactionsController.destroy");
  }).prefix("api/savingstransaction");
}).middleware("auth");

Route.post("/register", "AuthController.register");
Route.post("/login", "AuthController.login");
