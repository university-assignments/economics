import { TextField, TextFieldProps } from '@mui/material';


type NumericFieldProps = Omit<TextFieldProps, 'type'>;

export function NumericField (props: NumericFieldProps)
{
	return (
		<TextField
			sx={{ minWidth: '100px' }}
			type='number'
			{...props}
		/>
	);
}
