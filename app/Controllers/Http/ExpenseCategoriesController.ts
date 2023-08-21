import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ExpenseCategory from "App/Models/ExpenseCategory";

export default class ExpenseCategoriesController {
  // Fetch all Expense Categories
  async index({ response }) {
    try {
      return await ExpenseCategory.all();
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  // Fetch an Expense Categories by ID
  async show({ params, response }: HttpContextContract) {
    try {
      return await ExpenseCategory.findOrFail(params.id);
    } catch (error) {
      return response.status(500).json({ error: "Category Not Found" });
    }
  }

  //add a new Expense category
  public async store({ request, response }: HttpContextContract) {
    try {
      ExpenseCategory.create({ name: request.input("name") });
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  //update an Expense category by ID
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const expCategory = await ExpenseCategory.findOrFail(params.id);
      expCategory.name = request.input("name");
      expCategory.save();
      return response
        .status(200)
        .json({ message: "category updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const expCategory = await ExpenseCategory.findOrFail(params.id);
      expCategory.delete();
      return response
        .status(200)
        .json({ message: "category deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
