import z from "zod";
import validator from "validator";
import dayjs, { Dayjs } from "dayjs";

export type RegisterSchemaContext = {
	docNumLength?: number;
};

export const getRegisterSchema = (context: RegisterSchemaContext = {}) => {
	const { docNumLength } = context;

	const requiredSchema = z
		.string({ required_error: "El campo es obligatorio" })
		.min(1, "El campo es obligatorio");

	let docNumSchema = requiredSchema;

	if (docNumLength && docNumLength > 0) {
		docNumSchema = docNumSchema.length(
			docNumLength,
			`El Número de Documento debe tener ${docNumLength} ${
				docNumLength > 1 ? "caracteres" : "caracter"
			}`,
		);
	}

	return z.object({
		docType: requiredSchema,
		docNum: docNumSchema,
		name: requiredSchema,
		fatherLastname: requiredSchema,
		motherLastname: requiredSchema,
		birthdate: z.instanceof(dayjs as unknown as typeof Dayjs, {
			message: "El campo es obligatorio",
		}),
		gender: requiredSchema,
		email: z.string().email("Proporcione un correo válido"),
		phoneNumber: z
			.string()
			.refine(validator.isMobilePhone, "Proporcione un número válido"),
		address: requiredSchema,
		department: requiredSchema,
		province: requiredSchema,
		district: requiredSchema,
	});
};

export type RegisterData = Omit<
	z.infer<ReturnType<typeof getRegisterSchema>>,
	"birthdate"
> & {
	birthdate: Dayjs;
};
