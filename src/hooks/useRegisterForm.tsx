import { useEffect, useMemo, useState } from "react";
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
import { useForm, useWatch } from "react-hook-form";

export type RegisterData = {
	docType: string;
	docNum: string;
	name: string;
	fatherLastname: string;
	motherLastname: string;
	date: Date;
	gender: string;
	email: string;
	phoneNumber: string;
	address: string;
	department: string;
	province: string;
	district: string;
};

const DEFAULT_VALUES: Partial<RegisterData> = {
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
