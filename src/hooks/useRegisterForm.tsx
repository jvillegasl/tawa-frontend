import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
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
import { RegisterSchemaContext, getRegisterSchema } from "../schemas";

export type RegisterData = z.infer<ReturnType<typeof getRegisterSchema>>;

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
	const docNumLengthRef = useRef<number>(0);

	const {
		register,
		control,
		handleSubmit,
		setValue,
		clearErrors,
		watch,
		resetField,
		...form
	} = useForm<RegisterData, RegisterSchemaContext>({
		defaultValues: DEFAULT_VALUES,
		resolver: (values, context, options) => {
			const schema = getRegisterSchema(context);

			return zodResolver(schema)(values, context, options);
		},
		context: {
			docNumLength: docNumLengthRef.current,
		},
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
		() =>
			districtsRecord[`${currentDepartmentId}-${currentProvinceId}`] ??
			[],
		[districtsRecord, currentDepartmentId, currentProvinceId],
	);

	useEffect(() => {
		getDocumentTypes().then((t) => setDocTypes(t));
		getDepartments().then((t) => setDepartments(t));
	}, []);

	// Update and clear error of docNumLength when docType changes
	useEffect(() => {
		const docType = docTypes.find(
			(t) => t.idTipoDocumento.toString() === currentDocTypeId,
		);

		const newDocNumLength = docType?.maxNumDigito ?? 0;
		docNumLengthRef.current = newDocNumLength;
		clearErrors("docNum");
	}, [docTypes, currentDocTypeId, clearErrors]);

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

		const compoundId = `${currentDepartmentId}-${currentProvinceId}`;

		if (compoundId in districtsRecord) return;

		getDistricts(currentDepartmentId, currentProvinceId).then((v) =>
			setDistrictsRecord((t) => ({
				...t,
				[compoundId]: v,
			})),
		);
	}, [currentDepartmentId, currentProvinceId, districtsRecord]);
	const onSubmit = handleSubmit((data) => console.log(data));

	// Reset province and distric if department changes
	useEffect(() => {
		resetField("province");
		resetField("district");
	}, [currentDepartmentId, resetField]);

	// Reset distric if province changes
	useEffect(() => {
		resetField("district");
	}, [currentProvinceId, resetField]);

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
