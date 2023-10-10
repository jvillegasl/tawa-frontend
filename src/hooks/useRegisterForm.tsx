import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	IDepartment,
	IDistrict,
	IDocumentType,
	IProvince,
} from "../interfaces";
import {
	getDepartments,
	getDistricts,
	getDocumentTypes,
	getProvinces,
} from "../services";

const registerSchema = z.object({
	docType: z
		.string({ required_error: "El campo es obligatorio" })
		.min(1, "El campo es obligatorio"),
	docNum: z
		.string({ required_error: "El campo es obligatorio" })
		.min(1, "El campo es obligatorio")
		.length(5, "El Número de Documento debe tener 5 caracteres"),
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

export type RegisterData = z.infer<typeof registerSchema>;

const DEFAULT_VALUES = {
	docType: "",
	docNum: "",
	date: new Date(),
	department: "",
	province: "",
	district: "",
	gender: "",
};

export function useRegisterForm() {
	const { register, control, handleSubmit, setValue, watch, ...form } =
		useForm<RegisterData>({
			defaultValues: DEFAULT_VALUES,
			resolver: zodResolver(registerSchema),
		});

	const [docTypes, setDocTypes] = useState<IDocumentType[]>([]);
	const [departments, setDepartments] = useState<IDepartment[]>([]);
	const [provincesRecord, setProvincesRecord] = useState<
		Record<string, IProvince[]>
	>({});
	const [districtsRecord, setDistrictsRecord] = useState<
		Record<string, IDistrict[]>
	>({});

	const currentDocTypeId = useWatch({ control, name: "docType" });
	const currentDepartmentId = useWatch({ control, name: "department" });
	const currentProvinceId = useWatch({ control, name: "province" });

	const provincesOptions = useMemo<IProvince[]>(
		() => provincesRecord[currentDepartmentId] ?? [],
		[provincesRecord, currentDepartmentId],
	);
	const districtsOptions = useMemo<IDistrict[]>(
		() => districtsRecord[currentDepartmentId + currentProvinceId] ?? [],
		[districtsRecord, currentDepartmentId, currentProvinceId],
	);

	useEffect(() => {
		getDocumentTypes().then((t) => setDocTypes(t));
		getDepartments().then((t) => setDepartments(t));
	}, []);

	// Update docType default value after fetching
	useEffect(() => {
		if (!docTypes || docTypes.length === 0) return;

		if (currentDocTypeId) return;

		const defaultValue = docTypes[0].idTipoDocumento.toString();

		setValue("docType", defaultValue);
	}, [docTypes, currentDocTypeId, setValue]);

	// Fetch provinces if needed
	useEffect(() => {
		if (!currentDepartmentId) return;
		if (currentDepartmentId in provincesRecord) return;

		getProvinces(currentDepartmentId).then((v) =>
			setProvincesRecord((t) => ({ ...t, [currentDepartmentId]: v })),
		);
	}, [currentDepartmentId, provincesRecord]);

	// Fetch districts if needed
	useEffect(() => {
		if (!currentDepartmentId || !currentProvinceId) return;
		if (currentDepartmentId + currentProvinceId in districtsRecord) return;

		getDistricts(currentDepartmentId, currentProvinceId).then((v) =>
			setDistrictsRecord((t) => ({
				...t,
				[currentDepartmentId + currentProvinceId]: v,
			})),
		);
	}, [currentDepartmentId, currentProvinceId, districtsRecord]);
	const onSubmit = handleSubmit((data) => console.log(data));

	// Reset province and distric if department changes
	useEffect(() => {
		setValue("province", DEFAULT_VALUES["province"]);
		setValue("district", DEFAULT_VALUES["district"]);
	}, [currentDepartmentId, setValue]);

	// Reset distric if province changes
	useEffect(() => {
		setValue("district", DEFAULT_VALUES["district"]);
	}, [currentProvinceId, setValue]);

	return {
		docTypes,
		departments,
		provincesOptions,
		districtsOptions,
		register,
		control,
		onSubmit,
		setValue,
		watch,
		...form,
	};
}
