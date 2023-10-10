import validator from "validator";
import z from "zod";

export type RegisterSchemaContext = {
	docNumLength?: number;
};

export const getRegisterSchema = (context: RegisterSchemaContext = {}) => {
	const { docNumLength } = context;

	let docNumSchema = z
		.string({ required_error: "El campo es obligatorio" })
		.min(1, "El campo es obligatorio");

	if (docNumLength && docNumLength > 0) {
		docNumSchema = docNumSchema.length(
			docNumLength,
			`El Número de Documento debe tener ${docNumLength} ${
				docNumLength > 1 ? "caracteres" : "caracter"
			}`,
		);
	}

	return z.object({
		docType: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		docNum: docNumSchema,
		name: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		fatherLastname: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		motherLastname: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		date: z.date({ required_error: "El campo es obligatorio" }),
		gender: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		email: z.string().email("Proporcione un correo válido"),
		phoneNumber: z
			.string()
			.refine(validator.isMobilePhone, "Proporcione un número válido"),
		address: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		department: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		province: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
		district: z
			.string({ required_error: "El campo es obligatorio" })
			.min(1, "El campo es obligatorio"),
	});
};
