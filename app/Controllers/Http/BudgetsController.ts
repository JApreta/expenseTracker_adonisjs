import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Budget from "App/Models/Budget";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class BudgetsController {
  // Fetch an user budget
  async show({ response, auth }: HttpContextContract) {
    try {
      const user = await auth.use();
      const user_email = user.user?.$attributes.user_email;
      return await Budget.findByOrFail("user_email", user_email);
    } catch (error) {
      return response.status(500).json({ error: "Goal Not Found" });
    }
  }
  //fetch all user's budget
  public async showAllByUser({ response, auth }: HttpContextContract) {
    try {
      const user = await auth.use();
      const user_email = user.user?.$attributes.user_email;
      console.log(user.user?.$attributes.user_email);
      return await Budget.query().where("user_email", user_email);
    } catch (error) {
      return response.status(500).json({ error: "Budget Not Found..." });
    }
  }

  //add a new Budget goal
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        user_email: schema.string({}, [
          rules.email(),
          rules.exists({ table: "users", column: "user_email" }),
        ]),
        amount: schema.number([rules.unsigned()]),
        expense_category_id: schema.number([
          rules.unsigned(),
          rules.exists({ table: "expense_categories", column: "id" }),
        ]),
        month: schema.number([rules.unsigned(), rules.month()]),
        year: schema.number([rules.unsigned()]),
      });
      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      Budget.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update a budget entry
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const payload = request.only([
        "amount",
        "expense_category_id",
        "month",
        "year",
      ]);

      const aBudget = await Budget.findOrFail(params.id);

      if ("year" in payload) aBudget.year = payload.year;
      if ("expense_category_id" in payload)
        aBudget.expense_category_id = payload.expense_category_id;
      if ("amount" in payload) aBudget.amount = payload.amount;
      if ("month" in payload) aBudget.month = payload.month;

      aBudget.save();
      return response
        .status(200)
        .json({ message: "budget updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "failed to update" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const aBudget = await Budget.findOrFail(params.id);
      aBudget.delete();
      return response
        .status(200)
        .json({ message: "category deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
