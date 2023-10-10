import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

import { useRegisterForm } from "../hooks";

import { DocumentInput } from "./DocumentInput";
import { DateInput } from "./DateInput";
import { InputGroup } from "./InputGroup";
import { SelectInput } from "./SelectInput";
import { Controller } from "react-hook-form";

export function RegisterForm() {
	const {
		register,
		control,
		onSubmit,
		formState: { errors },
		departments,
		docTypes,
		provincesOptions,
		districtsOptions,
	} = useRegisterForm();

	return (
		<Box component="div" py={16} px={{ xs: 0, md: 2 }}>
			<Typography component="h2" variant="subtitle1" mb={4}>
				Ingrese sus datos personales
			</Typography>

			<Box component="form" onSubmit={onSubmit}>
				<Grid
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "auto",
							md: "repeat(2, 1fr)",
						},
					}}
					columnGap={3}
					rowGap={2}
					mb={3}
				>
					<DocumentInput
						control={control}
						docTypes={docTypes}
						{...register("docNum")}
						error={!!errors.docNum}
						helperText={errors.docNum?.message}
					/>

					<TextField
						placeholder="Nombre"
						size="small"
						{...register("name")}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>

					<TextField
						placeholder="Apellido paterno"
						size="small"
						{...register("fatherLastname")}
						error={!!errors.fatherLastname}
						helperText={errors.fatherLastname?.message}
					/>

					<TextField
						placeholder="Apellido materno"
						size="small"
						{...register("motherLastname")}
						error={!!errors.motherLastname}
						helperText={errors.motherLastname?.message}
					/>

					<DateInput
						control={control}
						error={!!errors.date}
						helperText={errors.date?.message}
					/>

					<FormControl error={!!errors.gender}>
						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<>
									<RadioGroup {...field} row>
										<FormControlLabel
											value="female"
											control={<Radio size="small" />}
											label="Femenino"
										/>

										<FormControlLabel
											value="male"
											control={<Radio size="small" />}
											label="Masculino"
										/>
									</RadioGroup>

									{!!errors.gender && (
										<FormHelperText>
											{errors.gender.message}
										</FormHelperText>
									)}
								</>
							)}
						></Controller>
					</FormControl>

					<InputGroup
						icon="@"
						placeholder="Correo electrónico"
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>

					<InputGroup
						icon={<PhoneIcon />}
						placeholder="Número celular"
						{...register("phoneNumber")}
						error={!!errors.phoneNumber}
						helperText={errors.phoneNumber?.message}
					/>

					<TextField
						placeholder="Dirección"
						size="small"
						{...register("address")}
						error={!!errors.address}
						helperText={errors.address?.message}
					/>

					<SelectInput
						label="Departamento"
						name="department"
						control={control}
						error={!!errors.department}
						helperText={errors.department?.message}
					>
						<MenuItem value="">
							-- Seleccione departamento --
						</MenuItem>

						{departments.map((t, i) => (
							<MenuItem key={i} value={t.codDepartamento}>
								{t.departamento}
							</MenuItem>
						))}
					</SelectInput>

					<SelectInput
						label="Provincia"
						name="province"
						control={control}
						error={!!errors.department}
						helperText={errors.department?.message}
					>
						<MenuItem value="">
							-- Seleccione provincia ---
						</MenuItem>

						{provincesOptions.map((t, i) => (
							<MenuItem key={i} value={t.codProvincia}>
								{t.provincia}
							</MenuItem>
						))}
					</SelectInput>

					<SelectInput
						label="Distrito"
						name="district"
						control={control}
						error={!!errors.department}
						helperText={errors.department?.message}
					>
						<MenuItem value="">-- Seleccione distrito ---</MenuItem>

						{districtsOptions.map((t, i) => (
							<MenuItem key={i} value={t.codUbigeo}>
								{t.distrito}
							</MenuItem>
						))}
					</SelectInput>
				</Grid>

				<Button type="submit" variant="contained" fullWidth>
					Register
				</Button>
			</Box>
		</Box>
	);
}
