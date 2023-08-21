import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SavingsGoal from "App/Models/SavingsGoal";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class SavingsGoalsController {
  // Fetch all Savings Goals
  async index({ response }) {
    try {
      return await SavingsGoal.all();
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  // Fetch an user goal by email
  async show({ params, response }: HttpContextContract) {
    try {
      return await SavingsGoal.findByOrFail("user_email", params.user_email);
    } catch (error) {
      return response.status(500).json({ error: "Goal Not Found" });
    }
  }
  //fetch all user's goals
  public async showAllByUser({ response, params }: HttpContextContract) {
    try {
      const user_email = params.user_email;
      console.log(user_email);
      return await SavingsGoal.query().where("user_email", user_email);
    } catch (error) {
      return response.status(500).json({ error: "Goal Not Found..." });
    }
  }

  //add a new Savings goal
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        user_email: schema.string({}, [
          rules.email(),
          rules.exists({ table: "users", column: "user_email" }),
        ]),
        amount: schema.number([rules.unsigned()]),
        savings_category_id: schema.number([
          rules.exists({ table: "savings_categories", column: "id" }),
        ]),
        status: schema.string({}, []),
        description: schema.string({}, []),
      });
      const payload = await request.validate({ schema: dataValidator }); //validate the user input
      SavingsGoal.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update an Savings category by ID
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const payload = request.only([
        "amount",
        "savings_category_id",
        "status",
        "description",
      ]);

      const savGoal = await SavingsGoal.findOrFail(params.id);

      if ("status" in payload) savGoal.status = payload.status;
      if ("savings_category_id" in payload)
        savGoal.savings_category_id = payload.savings_category_id;
      if ("amount" in payload) savGoal.amount = payload.amount;
      if ("description" in payload) savGoal.description = payload.description;

      savGoal.save();
      return response
        .status(200)
        .json({ message: "goal updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const savCategory = await SavingsGoal.findOrFail(params.id);
      savCategory.delete();
      return response
        .status(200)
        .json({ message: "category deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
