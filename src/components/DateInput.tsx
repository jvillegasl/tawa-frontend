import { Control, Controller } from "react-hook-form";
import { RegisterData } from "../hooks";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type DateInputProps = {
	control: Control<RegisterData>;
	error?: boolean;
	helperText?: string;
};

export function DateInput({ control, error, helperText }: DateInputProps) {
	return (
		<Controller
			name="date"
			control={control}
			render={({ field }) => (
				<DatePicker<Dayjs>
					label="dd/mm/yyyy"
					slotProps={{
						textField: { size: "small", helperText, error },
					}}
					value={dayjs(field.value)}
					inputRef={field.ref}
					onChange={(date) => field.onChange(date?.toDate())}
				/>
			)}
		/>
	);
}
