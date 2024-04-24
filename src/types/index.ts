import { number, object, string,boolean, array, Output } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const DrinkSchema = object({
  idDrink: string(),
  strDrink: string(),
});

export type Drink = Output<typeof DrinkSchema>

export const DrinksList = array(DrinkSchema)