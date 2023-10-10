import { Box, InputAdornment, TextField } from "@mui/material";
import { ReactNode, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputGroupRops = {
	icon: ReactNode;
	placeholder: string;
	error?: boolean;
	helperText?: string;
} & Omit<UseFormRegisterReturn, "ref">;

export const InputGroup = forwardRef<HTMLInputElement, InputGroupRops>(
	({ icon, ...props }, ref) => {
		return (
			<TextField
				ref={ref}
				size="small"
				variant="outlined"
				{...props}
				InputProps={{
					sx: {
						p: 0,
						overflow: "hidden",
					},
					startAdornment: (
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
								{icon}
							</Box>
						</InputAdornment>
					),
				}}
			/>
		);
	},
);
