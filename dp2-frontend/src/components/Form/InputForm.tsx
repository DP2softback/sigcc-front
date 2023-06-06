import { useController, Control, FieldError } from "react-hook-form";
import { z } from "zod";
import { Form } from "react-bootstrap";

type InputFormProps = {
	name: string;
	placeholder: string;
	control: Control<any>;
	rules?: z.ZodType<any, any>;
};

const ImputForm: React.FC<InputFormProps> = ({
	name,
	placeholder,
	control,
	rules,
	...props
}: InputFormProps) => {
	const {
		field,
		fieldState: { error }
	} = useController({
		name,
		control,
		rules: {
			validate: async (value: any) => {
				try {
					await rules?.parseAsync(value);
					return true;
				} catch (error) {
					return error.message;
				}
			}
		}
	});

	return (
		<>
			<Form.Control
				{...field}
				{...props}
				isInvalid={!!error}
				required
				type="text"
				placeholder={placeholder}
			/>
			{error && (
				<Form.Control.Feedback type="invalid">
					{(error as FieldError)?.message}
				</Form.Control.Feedback>
			)}
		</>
	);
};

export default ImputForm;
