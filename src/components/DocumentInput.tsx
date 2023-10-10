import {
	FormControl,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
	TextFieldProps,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { RegisterData } from "../hooks";
import { IDocumentType } from "../interfaces";

type DocumentInputProps = {
	control: Control<RegisterData>;
	docTypes: IDocumentType[];
} & Pick<TextFieldProps, "error" | "helperText">;

type DocumentTypeInputProps = Pick<DocumentInputProps, "control" | "docTypes">;

export function DocumentInput({
	control,
	docTypes,
	error,
	helperText,
}: DocumentInputProps) {
	return (
		<Controller
			name="docNum"
			control={control}
			render={({ field }) => (
				<TextField
					{...field}
					placeholder="Número de Documento"
					size="small"
					variant="outlined"
					error={error}
					helperText={helperText}
					InputProps={{
						sx: { p: 0 },
						startAdornment: (
							<InputAdornment position="start">
								<DocumentTypeInput
									control={control}
									docTypes={docTypes}
								/>
							</InputAdornment>
						),
					}}
				/>
			)}
		/>
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
