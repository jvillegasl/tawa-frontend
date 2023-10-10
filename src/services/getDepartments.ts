import axios from "axios";
import { IDepartment } from "../interfaces";

type GetDepartmentsResponse = IDepartment[]

export async function getDepartments() {
	const BASE_URL = import.meta.env.VITE_BACKEND_URL;
	const ENDPOINT = "/api/H001_Ubigeo/ListarDepartamento";

	const response = await axios.get<GetDepartmentsResponse>(ENDPOINT, {
		baseURL: BASE_URL,
	});

	return response.data;
}
