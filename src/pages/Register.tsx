import { Box, Container, Divider, Typography } from "@mui/material";
import { RegisterForm } from "../components";
import Banner from "../assets/banner.png";

export default function Register() {
	return (
		<Container component="main">
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "auto", md: "repeat(2, 1fr)" },
				}}
			>
				<Box
					py={4}
					px={2}
					sx={{ display: { xs: "none", md: "block" } }}
				>
					<Typography
						component="h1"
						variant="h4"
						align="right"
						mb={2}
					>
						Prueba Técnica
					</Typography>

					<Divider color="black" />

					<img src={Banner} className="mw-100" />
				</Box>

				<RegisterForm />
			</Box>
		</Container>
	);
}
