import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import IncomeTransaction from "App/Models/IncomeTransaction";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class IncomeTransactionsController {
  // Fetch an user IncomeTransaction
  async show({ response, auth }: HttpContextContract) {
    try {
      const user = auth.use();
      const user_email = user.user?.$attributes.user_email;
      return await IncomeTransaction.findByOrFail("user_email", user_email);
    } catch (error) {
      return response
        .status(500)
        .json({ error: " Income Transaction Not Found" });
    }
  }
  //fetch all user's IncomeTransaction
  public async showAllByUser({ response, auth }: HttpContextContract) {
    try {
      const user = auth.use();
      const user_email = user.user?.$attributes.user_email;
      console.log(user.user?.$attributes.user_email);
      return await IncomeTransaction.query().where("user_email", user_email);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Income Transaction Not Found..." });
    }
  }

  //add a new income transaction
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        user_email: schema.string({}, [
          rules.email(),
          rules.exists({ table: "users", column: "user_email" }),
        ]),
        amount: schema.number([rules.unsigned()]),
        income_category_id: schema.number([
          rules.unsigned(),
          rules.exists({ table: "income_categories", column: "id" }),
        ]),
        description: schema.string({}, []),
        transaction_date: schema.date({
          format: "yyyy-MM-dd",
        }),
      });
      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      IncomeTransaction.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update a IncomeTransaction entry
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        amount: schema.number.optional([rules.unsigned()]),
        income_category_id: schema.number.optional([
          rules.unsigned(),
          rules.exists({ table: "income_categories", column: "id" }),
        ]),
        description: schema.string.optional({}, []),
        transaction_date: schema.date.optional({
          format: "yyyy-MM-dd",
        }),
      });

      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      const aIncomeTransaction = await IncomeTransaction.findOrFail(params.id);
      aIncomeTransaction.merge(payload);
      aIncomeTransaction.save();
      return response
        .status(200)
        .json({ message: "Income Transaction updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "failed to update" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const aIncomeTransaction = await IncomeTransaction.findOrFail(params.id);
      aIncomeTransaction.delete();
      return response
        .status(200)
        .json({ message: "income transaction deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
