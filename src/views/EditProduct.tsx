import {
  Form,
  Link,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct, getCocktail, updateProduct } from "../services/ProductService";
import { useLoaderData } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { Drink } from "../types";

export async function action({ request, params }: ActionFunctionArgs) {
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

  console.log(params.id);

  if (params.id !== undefined) {
    await updateProduct(data, params.id);
    return redirect("/");
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);
  return params.id;
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const error = useActionData() as string;

  const name = useLoaderData() as string;

  const product: any = getCocktail() 
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Productos</h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
       <ProductForm product = {product}/>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue=""
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Editar Producto"
        />
      </Form>
    </>
  );
}
