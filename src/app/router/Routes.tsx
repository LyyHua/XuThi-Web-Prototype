import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ShoppingForm from "../../features/Form/ShoppingForm";
import ShoppingCartInfo from "../../features/Shopping Cart Info Page/ShoppingCartInfo";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/giohang', element: <ShoppingCartInfo/>},
            {path: '/thanhtoan/', element: <ShoppingForm/>}
        ]
    }
])