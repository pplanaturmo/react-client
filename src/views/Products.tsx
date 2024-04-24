import axios from "axios";
import {
  ActionFunctionArgs,
  Form,
  Link,
  NavLink,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getCocktail } from "../services/ProductService";
import { Drink } from "../types";

export async function loader() {
  const drink = await getCocktail();

  console.log(drink);

  // www.thecocktaildb.com/api/json/v1/1/random.php
  return drink as Drink;
}

export async function action({request}: ActionFunctionArgs) {
  console.log("action de rpoducts");

  const data = Object.fromEntries(await request.formData())

  console.log(data);
  
  return {}
}





export default function Products() {

  const fetcher =useFetcher()
  const navigate = useNavigate();
  const drink: any = useLoaderData();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to={"products/new"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
        <h2>{drink.strDrink}</h2>
      </div>
      <button
        onClick={() => navigate(`/products/drink.strDrink/edit`)}
        className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
      >
        Editar
      </button>
      <fetcher.Form
        className="w-full"
        action={`/`}
        onSubmit={(event) => {
          if (!confirm(`¿Quiere borrar `)) {
            event.preventDefault();
          } else {
            console.log("BORRAMOS ALGO");
            redirect("/");
          }
        }}
      >
        <input
          type="submit"
          value={"Borrar"}
          className="bg-red-600 text-white rounded-md w-full p-2 uppercase font-bold text-xs text-center"
        ></input>
      </fetcher.Form>
      <fetcher.Form method="POST">
        <button
          type="button"
          name="availability"
          value={"true"}
          className="text-black rounded-md p-2 text-xs uppercase font-bold border border-black-100 hover:cursor-pointer"
        >
          Disponibilidad
        </button>
      </fetcher.Form>
    </>
  );
}
