import { Navigate, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";

export const router = createBrowserRouter([
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "*",
		element: <Navigate to="/register" />,
	},
]);
