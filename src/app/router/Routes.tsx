import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ShoppingForm from "../../features/Form/ShoppingForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/thanhtoan/:id', element: <ShoppingForm/>}
        ]
    }
])