import {
	Box,
	InputAdornment,
	InputBaseProps,
	OutlinedInput,
} from "@mui/material";
import { ReactNode, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputGroupRops = {
	icon: ReactNode;
} & Pick<InputBaseProps, "placeholder"> &
	Omit<UseFormRegisterReturn, "ref">;

export const InputGroup = forwardRef<HTMLInputElement, InputGroupRops>(
	({ icon, ...props }, ref) => {
		return (
			<OutlinedInput
				ref={ref}
				size="small"
				sx={{ p: 0, overflow: "hidden" }}
				{...props}
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
							{icon}
						</Box>
					</InputAdornment>
				}
			/>
		);
	},
);
