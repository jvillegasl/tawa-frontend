import axios from "axios";
import { IDistrict } from "../interfaces";

type GetDistrictsResponse = IDistrict[];

export async function getDistricts(departmentId: string, provinceId: string) {
	const BASE_URL = import.meta.env.VITE_BACKEND_URL;

	const ENDPOINT = `/api/H001_Ubigeo/ListarDistrito/${departmentId}/${provinceId}`;

	const response = await axios.get<GetDistrictsResponse>(ENDPOINT, {
		baseURL: BASE_URL,
	});

	return response.data;
}
