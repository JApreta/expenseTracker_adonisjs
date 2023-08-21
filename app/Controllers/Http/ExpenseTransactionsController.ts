import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ExpenseTransaction from "App/Models/ExpenseTransaction";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class ExpenseCategoriesController {
  // Fetch an user ExpenseTransaction
  async show({ response, auth }: HttpContextContract) {
    try {
      const user = auth.use();
      const user_email = user.user?.$attributes.user_email;
      return await ExpenseTransaction.findByOrFail("user_email", user_email);
    } catch (error) {
      return response.status(500).json({ error: "Goal Not Found" });
    }
  }
  //fetch all user's ExpenseTransaction
  public async showAllByUser({ response, auth }: HttpContextContract) {
    try {
      const user = auth.use();
      const user_email = user.user?.$attributes.user_email;
      console.log(user.user?.$attributes.user_email);
      return await ExpenseTransaction.query().where("user_email", user_email);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "ExpenseTransaction Not Found..." });
    }
  }

  //add a new expense transaction
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
        description: schema.string({}, []),
        transaction_date: schema.date({
          format: "yyyy-MM-dd",
        }),
      });
      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      ExpenseTransaction.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update a ExpenseTransaction entry
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        amount: schema.number.optional([rules.unsigned()]),
        expense_category_id: schema.number.optional([
          rules.unsigned(),
          rules.exists({ table: "expense_categories", column: "id" }),
        ]),
        description: schema.string.optional({}, []),
        transaction_date: schema.date.optional({
          format: "yyyy-MM-dd",
        }),
      });

      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      const aExpenseTransaction = await ExpenseTransaction.findOrFail(
        params.id
      );
      aExpenseTransaction.merge(payload);
      aExpenseTransaction.save();
      return response
        .status(200)
        .json({ message: "Expense Transaction updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "failed to update" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const aExpenseTransaction = await ExpenseTransaction.findOrFail(
        params.id
      );
      aExpenseTransaction.delete();
      return response
        .status(200)
        .json({ message: "expense transaction deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
