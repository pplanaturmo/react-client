import {createBrowserRouter} from "react-router-dom"
import Layouts from "./layouts/Layouts"
import Products,{loader as productsLoader, action as updateAvailability} from "./views/Products"
import NewProduct, { action as newProductAction } from "./views/NewProduct"
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./views/EditProduct"



export const router = createBrowserRouter([
{
    path: "/",
    element:<Layouts />,
    children: [
        {
            index: true,
            element: <Products />,
            loader: productsLoader,
            action: updateAvailability
        },
        {
            path: "/products/new",
            element: <NewProduct />,
            action: newProductAction
        },
        {
            path:"products/:id/edit" ,//ROA pattern,
            element:<EditProduct></EditProduct>,
            loader: editProductLoader,
            action: editProductAction,
        }
    ]
},


])


