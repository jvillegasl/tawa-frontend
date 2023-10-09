import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export function RegisterForm() {
	return (
		<Box component="div" py={8} px={{xs: 0, md: 2}}>
			<Typography component="h2" variant="subtitle1" mb={4}>
				Ingrese sus datos personales
			</Typography>

			<Box component="form">
				<Grid
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
					}}
					columnGap={3}
					rowGap={2}
					mb={3}
				>
					<TextField placeholder="Número de Documento" size="small" />

					<TextField placeholder="Nombre" size="small" />

					<TextField placeholder="Apellido paterno" size="small" />

					<TextField placeholder="Apellido materno" size="small" />

					<DatePicker
						label="dd/mm/yyyy"
						slotProps={{ textField: { size: "small" } }}
					/>

					<FormGroup row>
						<FormControlLabel
							control={<Checkbox />}
							label={
								<Typography variant="caption">
									Femenino
								</Typography>
							}
						/>
						<FormControlLabel
							control={<Checkbox />}
							label={
								<Typography variant="caption">
									Masculino
								</Typography>
							}
						/>
					</FormGroup>

					<TextField placeholder="Correo electrónico" size="small" />

					<TextField placeholder="Número celular" size="small" />

					<TextField placeholder="Dirección" size="small" />

					<FormControl size="small">
						<InputLabel>Seleccione departamento</InputLabel>
						<Select label="Seleccione departamento">
							<MenuItem value={1}>Test 1</MenuItem>
							<MenuItem value={2}>Test 2</MenuItem>
							<MenuItem value={3}>Test 3</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small">
						<InputLabel>Seleccione provincia</InputLabel>
						<Select label="Seleccione provincia">
							<MenuItem value={1}>Test 1</MenuItem>
							<MenuItem value={2}>Test 2</MenuItem>
							<MenuItem value={3}>Test 3</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small">
						<InputLabel>Seleccione distrito</InputLabel>
						<Select label="Seleccione distrito">
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
