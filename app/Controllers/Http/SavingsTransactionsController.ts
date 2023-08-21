import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SavingsTransaction from "App/Models/SavingsTransaction";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class SavingsCategoriesController {
  // Fetch an user SavingsTransaction
  async show({ response, params }: HttpContextContract) {
    try {
      return await SavingsTransaction.findOrFail(params.id);
    } catch (error) {
      return response
        .status(500)
        .json({ error: " Savings Transaction Not Found" });
    }
  }
  //fetch all user's SavingsTransaction
  public async showAllByUser({ response, auth }: HttpContextContract) {
    try {
      const user = auth.use();
      const user_email = user.user?.$attributes.user_email;

      const query = `
        SELECT ST.id AS 'Transaction ID', SC.name AS 'Category Name', ST.amount AS Amount, ST.transaction_date AS 'Transaction Date'
        FROM savings_transactions ST
        INNER JOIN savings_goals SG ON SG.id = ST.savings_goal_id
        INNER JOIN savings_categories SC ON SC.id = SG.savings_category_id
        WHERE SG.user_email = ?
        ORDER BY SG.id`;

      const savingsTransactions = await Database.rawQuery(query, [user_email]);

      return savingsTransactions;
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Savings Transaction Not Found..." });
    }
  }

  //add a new Savings transaction
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        amount: schema.number([rules.unsigned()]),
        savings_goal_id: schema.number([
          rules.unsigned(),
          rules.exists({ table: "savings_goals", column: "id" }),
        ]),
        description: schema.string({}, []),
        transaction_date: schema.date({
          format: "yyyy-MM-dd",
        }),
      });
      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      SavingsTransaction.create(payload);
      return response.status(201).json({ created: true });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  //update a SavingsTransaction entry
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const dataValidator = schema.create({
        amount: schema.number.optional([rules.unsigned()]),
        savings_goal_id: schema.number.optional([
          rules.unsigned(),
          rules.exists({ table: "savings_goals", column: "id" }),
        ]),
        description: schema.string.optional({}, []),
        transaction_date: schema.date.optional({
          format: "yyyy-MM-dd",
        }),
      });

      const payload = await request.validate({
        schema: dataValidator,
      }); //validate the user input
      const aSavingsTransaction = await SavingsTransaction.findOrFail(
        params.id
      );
      aSavingsTransaction.merge(payload);
      aSavingsTransaction.save();
      return response
        .status(200)
        .json({ message: "Savings Transaction updated usccessfully" });
    } catch (error) {
      return response.status(500).json({ error: "failed to update" });
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const aSavingsTransaction = await SavingsTransaction.findOrFail(
        params.id
      );
      aSavingsTransaction.delete();
      return response
        .status(200)
        .json({ message: "Savings transaction deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
