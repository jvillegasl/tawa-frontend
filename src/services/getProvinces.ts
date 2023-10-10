import axios from "axios";
import { IProvince } from "../interfaces";

type GetProvincesResponse = IProvince[];

export async function getProvinces(departmentId: string) {
	const BASE_URL = import.meta.env.VITE_BACKEND_URL;

	const ENDPOINT = `/api/H001_Ubigeo/ListarProvincia/${departmentId}`;

	const response = await axios.get<GetProvincesResponse>(ENDPOINT, {
		baseURL: BASE_URL,
	});

	return response.data;
}
