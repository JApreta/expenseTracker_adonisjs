/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
//import { number } from "@ioc:Adonis/Core/Helpers";
import { validator } from "@ioc:Adonis/Core/Validator";

validator.rule("month", (value, _, options) => {
  if (typeof value !== "number") {
    return;
  }

  if (value < 1 && value > 12) {
    options.errorReporter.report(
      options.pointer,
      "month",
      "month validation failed",
      options.arrayExpressionPointer
    );
  }
});
