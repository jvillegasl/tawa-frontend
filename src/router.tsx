import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/register",
		element: <div>Hello Word</div>,
	},
	{
		path: '*',
		element: <Navigate to='/register'/>
		}
]);
