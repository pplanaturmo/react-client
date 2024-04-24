import { boolean, coerce, number, parse, safeParse } from "valibot";
import { DraftProductSchema, Drink, DrinkSchema } from "../types";
import axios from "axios";
import { DrinksList} from '../types/index';
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}api/products`;

      const { data } = await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });

      return data

    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCocktail() {

    try {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      const {data} = await axios(url)
      console.log(data);
      const result = safeParse(DrinkSchema,data.drinks[0]) 

     if (result.success) {
        return result.output
     } else {
        throw new Error("Fallo");
        
     }
      
  
    } catch (error) {
      
    }
  }

  export async function updateProduct(data: ProductData,id : Drink['idDrink']) {
    console.log(data);
    console.log(id);

    
    try {
        const NumberSchema = coerce(number(), Number)
        

        const result = safeParse(DrinkSchema,{
          id : id,
          price : parse(NumberSchema,id),
          name : data.name,
          availability : toBoolean(data.toString())
        })

        if(result.success){
          const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
          const {data} = await axios.put(url,result.output)
        }
    } catch (error) {
      console.log(error);
      
    }
   
  }

  export async function deleteProduct(id:Drink['idDrink']) {
    
try {
  const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`

  // await axios delete(url)
} catch (error) {
  console.log(error);
  
}


  }
