import { useEffect, useState } from "react";
import { IDepartment } from "../interfaces";
import { getDepartments } from "../services";

export function useRegisterForm() {
	const [departments, setDepartments] = useState<IDepartment[]>([]);

	useEffect(() => {
		getDepartments().then((t) => setDepartments(t));
	}, []);

	return {
		departments,
	};
}
