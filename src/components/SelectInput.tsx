import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { ReactNode } from "react";
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
} from "react-hook-form";

type SelectInputProps = {
	label: string;
	children?: ReactNode;
	error?: boolean;
	helperText?: string;
};

export function SelectInput<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	label,
	name,
	control,
	children,
	error,
	helperText,
}: SelectInputProps &
	Pick<ControllerProps<TFieldValues, TName>, "control" | "name">) {
	return (
		<FormControl size="small" error={error}>
			<InputLabel shrink>{label}</InputLabel>

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select {...field} label={label} displayEmpty notched>
						{children}
					</Select>
				)}
			/>

			{error && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
}
