import {
	FormControl,
	InputAdornment,
	MenuItem,
	OutlinedInput,
	Select,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { RegisterData } from "../hooks";
import { IDocumentType } from "../interfaces";

type DocumentInputProps = {
	control: Control<RegisterData>;
	docTypes: IDocumentType[];
};

type DocumentTypeInputProps = Pick<DocumentInputProps, "control" | "docTypes">;

export function DocumentInput({ control, docTypes }: DocumentInputProps) {
	return (
		<div>
			<Controller
				name="docNum"
				control={control}
				render={({ field }) => (
					<OutlinedInput
						{...field}
						placeholder="Número de Documento"
						size="small"
						sx={{ p: 0 }}
						startAdornment={
							<InputAdornment position="start">
								<DocumentTypeInput
									control={control}
									docTypes={docTypes}
								/>
							</InputAdornment>
						}
					/>
				)}
			/>
		</div>
	);
}

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
