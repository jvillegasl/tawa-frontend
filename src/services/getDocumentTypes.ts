import axios from "axios";
import { IDocumentType } from "../interfaces";

type GetDocumentTypesResponse = IDocumentType[];

export async function getDocumentTypes() {
	const BASE_URL = import.meta.env.VITE_BACKEND_URL;

	const ENDPOINT = "/api/H001_TipoDocumento/ListarTipoDocumento";

	const response = await axios.get<GetDocumentTypesResponse>(ENDPOINT, {
		baseURL: BASE_URL,
	});

	return response.data;
}
