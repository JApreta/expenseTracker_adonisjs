import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    //create validation rules for user input
    const dataValidator = schema.create({
      user_email: schema.string({}, [
        rules.email(),
        rules.unique({ table: "users", column: "user_email" }),
      ]),
      password: schema.string(),
      first_name: schema.string(),
      last_name: schema.string(),
    });
    try {
      const payload = await request.validate({ schema: dataValidator }); //validate the user input
      User.create(payload); //register the user
      return response.status(201).json({ message: "new user added" });
    } catch (error) {
      return response.status(500).json({ error: error.messages.errors });
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const user_email = request.input("user_email");
      const password = request.input("password");
      const token = await auth.attempt(user_email, password);
      return token.toJSON();
    } catch (error) {
      return response.status(500).json({ error: error.responseText });
    }
  }
}
