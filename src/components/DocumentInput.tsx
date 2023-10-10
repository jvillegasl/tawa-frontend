import { forwardRef } from "react";
import {
	Box,
	FormControl,
	MenuItem,
	Select,
	TextField,
	TextFieldProps,
} from "@mui/material";
import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";
import { IDocumentType } from "../interfaces";
import { RegisterData } from "../schemas";

type DocumentInputProps = {
	control: Control<RegisterData>;
	docTypes: IDocumentType[];
} & Pick<TextFieldProps, "error" | "helperText"> &
	Omit<UseFormRegisterReturn, "ref">;

type DocumentTypeInputProps = Pick<DocumentInputProps, "control" | "docTypes">;

export const DocumentInput = forwardRef<HTMLInputElement, DocumentInputProps>(
	({ control, docTypes, error, helperText, ...props }, ref) => {
		return (
			<Box sx={{ display: "flex" }}>
				<DocumentTypeInput control={control} docTypes={docTypes} />
				<TextField
					ref={ref}
					className="flex-grow-1"
					placeholder="Número de Documento"
					size="small"
					variant="outlined"
					sx={{ flexGrow: 1 }}
					{...props}
					error={error}
					helperText={helperText}
					autoFocus
				/>
			</Box>
		);
	},
);

function DocumentTypeInput({ control, docTypes }: DocumentTypeInputProps) {
	return (
		<FormControl size="small">
			<Controller
				name="docType"
				control={control}
				render={({ field }) => (
					<Select
						sx={{
							bgcolor: "primary.main",
							color: "white",
						}}
						{...field}
					>
						{docTypes.map((t, i) => (
							<MenuItem
								key={i}
								value={t.idTipoDocumento.toString()}
							>
								{t.abreviatura}
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	);
}
