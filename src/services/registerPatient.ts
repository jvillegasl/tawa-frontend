import axios, { AxiosResponse } from "axios";
import { RegisterData } from "../schemas";

type RegisterPatientResponse = unknown;

type RegisterPatientRequest = {
	idTipoDocumento: number;
	numDocIdentidad: string;
	nombre: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	idSexo: string;
	fechaNacimiento: string;
	codUbigeoNacimiento: string;
	telefonoMovil: string;
	correo: string;
};

export async function registerPatient(data: RegisterData) {
	const BASE_URL = import.meta.env.VITE_BACKEND_URL;

	const ENDPOINT = "/api/H001_Paciente/InsertarPaciente";

	const body: RegisterPatientRequest = {
		apellidoMaterno: data.motherLastname,
		apellidoPaterno: data.fatherLastname,
		codUbigeoNacimiento: data.district,
		correo: data.email,
		fechaNacimiento: data.birthdate.toISOString(),
		idTipoDocumento: parseInt(data.docType),
		nombre: data.name,
		numDocIdentidad: data.docNum,
		idSexo: data.gender,
		telefonoMovil: data.phoneNumber,
	};

	const response = await axios.post<
		RegisterPatientResponse,
		AxiosResponse<RegisterPatientRequest>,
		RegisterPatientRequest
	>(ENDPOINT, body, { baseURL: BASE_URL });

	return response.data;
}
