import {
  Form,
  Link,
  useActionData,
  ActionFunctionArgs,redirect,useNavigate,useLoaderData
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct, getCocktail } from "../services/ProductService";
import { Drink } from "../types";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
    console.log(error);
  }
  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/");
}

export async function loader() {
    const drink = await getCocktail()
   
    console.log(drink);
    
     // www.thecocktaildb.com/api/json/v1/1/random.php
     return drink as Drink
   }
   
 
   
   
   export default function NewProduct() {
       const error = useActionData() as string;
       
       const drink : any = useLoaderData();
  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
      <button
         onClick={()=> navigate(`/products/${drink.strDrink}/edit` )}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
        >
          Editar
        </button>
    </>
  );
}
