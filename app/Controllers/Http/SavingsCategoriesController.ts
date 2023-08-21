import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SavingsCategory from "App/Models/SavingsCategory";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class SavingsCategoriesController {
  // Fetch all Savings Categories
  async index({ response }) {
    try {
      return await SavingsCategory.all();
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  // Fetch an Savings Categories by ID
  async show({ params, response }: HttpContextContract) {
    try {
      return await SavingsCategory.findOrFail(params.id);
    } catch (error) {
      return response.status(500).json({ error: "Category Not Found" });
    }
  }

  //add a new Savings category
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        name: schema.string({}, [
          rules.unique({ table: "savings_categories", column: "name" }),
        ]),
      });
      const payload = await request.validate({ schema: dataValidator }); //validate the user input
      SavingsCategory.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update an Savings category by ID
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const savCategory = await SavingsCategory.findOrFail(params.id);
      savCategory.name = request.input("name");
      savCategory.save();
      return response
        .status(200)
        .json({ message: "category updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const savCategory = await SavingsCategory.findOrFail(params.id);
      savCategory.delete();
      return response
        .status(200)
        .json({ message: "category deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
