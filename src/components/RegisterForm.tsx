import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useRegisterForm } from "../hooks";
import { useEffect } from "react";

type RegisterData = {
	docType: string;
	docNum: string;
	name: string;
	fatherLastname: string;
	motherLastname: string;
	date: Date;
	gender: string;
	email: string;
	cellNumber: string;
	address: string;
	department: string;
	province: string;
	district: string;
};

export function RegisterForm() {
	const { departments } = useRegisterForm();
	const { register, control, handleSubmit } = useForm<RegisterData>();

	const onSubmit = handleSubmit((data) => console.log(data));

	useEffect(() => {
		console.log(departments);
	}, [departments]);

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
					<OutlinedInput
						placeholder="Número de Documento"
						size="small"
						sx={{ p: 0 }}
						{...register("docNum")}
						startAdornment={
							<InputAdornment position="start">
								<FormControl size="small">
									<Select
										defaultValue={1}
										sx={{
											bgcolor: "primary.main",
											color: "white",
										}}
										{...register("docType")}
									>
										<MenuItem value={1}>Test 1</MenuItem>
										<MenuItem value={2}>Test 2</MenuItem>
										<MenuItem value={3}>Test 3</MenuItem>
									</Select>
								</FormControl>
							</InputAdornment>
						}
					/>

					<TextField
						placeholder="Nombre"
						size="small"
						{...register("name")}
					/>

					<TextField
						placeholder="Apellido paterno"
						size="small"
						{...register("fatherLastname")}
					/>

					<TextField
						placeholder="Apellido materno"
						size="small"
						{...register("motherLastname")}
					/>

					<Controller
						name="date"
						control={control}
						defaultValue={new Date()}
						render={({ field }) => (
							<DatePicker<Dayjs>
								label="dd/mm/yyyy"
								slotProps={{ textField: { size: "small" } }}
								value={dayjs(field.value)}
								inputRef={field.ref}
								onChange={(date) =>
									field.onChange(date?.toDate())
								}
							/>
						)}
					/>

					<FormControl>
						<RadioGroup {...register("gender")} row>
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
					</FormControl>

					<OutlinedInput
						placeholder="Correo electrónico"
						size="small"
						sx={{ p: 0, overflow: "hidden" }}
						{...register("email")}
						startAdornment={
							<InputAdornment position="start">
								<Box
									sx={{
										bgcolor: "primary.main",
										color: "white",
										height: 40,
										width: 56,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									@
								</Box>
							</InputAdornment>
						}
					/>

					<OutlinedInput
						placeholder="Número celular"
						size="small"
						sx={{ p: 0, overflow: "hidden" }}
						{...register("cellNumber")}
						startAdornment={
							<InputAdornment position="start">
								<Box
									sx={{
										bgcolor: "primary.main",
										color: "white",
										height: 40,
										width: 56,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<PhoneIcon />
								</Box>
							</InputAdornment>
						}
					/>

					<TextField placeholder="Dirección" size="small" />

					<FormControl size="small">
						<InputLabel>Departamento</InputLabel>
						<Select
							label="Departamento"
							defaultValue={0}
							{...register("department")}
						>
							<MenuItem value={0}>
								-- Seleccione departamento --
							</MenuItem>

							{departments.map((t, i) => (
								<MenuItem key={i} value={t.codDepartamento}>
									{t.departamento}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small">
						<InputLabel>Provincia</InputLabel>
						<Select
							label="Provincia"
							defaultValue={0}
							{...register("province")}
						>
							<MenuItem value={0}>
								-- Seleccione provincia --
							</MenuItem>
							<MenuItem value={1}>Test 1</MenuItem>
							<MenuItem value={2}>Test 2</MenuItem>
							<MenuItem value={3}>Test 3</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small">
						<InputLabel>Distrito</InputLabel>
						<Select
							label="Distrito"
							defaultValue={0}
							{...register("district")}
						>
							<MenuItem value={0}>
								-- Seleccione distrito ---
							</MenuItem>
							<MenuItem value={1}>Test 1</MenuItem>
							<MenuItem value={2}>Test 2</MenuItem>
							<MenuItem value={3}>Test 3</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Button type="submit" variant="contained" fullWidth>
					Register
				</Button>
			</Box>
		</Box>
	);
}
