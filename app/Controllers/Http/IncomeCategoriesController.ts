import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import IncomeCategory from "App/Models/IncomeCategory";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class IncomeCategoriesController {
  // Fetch all Income Categories
  async index({ response }) {
    try {
      return await IncomeCategory.all();
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  // Fetch an Income Categories by ID
  async show({ params, response }: HttpContextContract) {
    try {
      return await IncomeCategory.findOrFail(params.id);
    } catch (error) {
      return response.status(500).json({ error: "Category Not Found" });
    }
  }

  //add a new Income category
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        name: schema.string({}, [
          rules.unique({ table: "income_categories", column: "name" }),
        ]),
      });
      const payload = await request.validate({ schema: dataValidator }); //validate the user input
      IncomeCategory.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update an Income category by ID
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const incCategory = await IncomeCategory.findOrFail(params.id);
      incCategory.name = request.input("name");
      incCategory.save();
      return response
        .status(200)
        .json({ message: "category updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const incCategory = await IncomeCategory.findOrFail(params.id);
      incCategory.delete();
      return response
        .status(200)
        .json({ message: "category deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
