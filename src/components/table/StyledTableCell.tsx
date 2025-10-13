import { styled, TableCell } from '@mui/material';


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	'&:not(:first-child)': {
		borderLeft: '1px solid ' + theme.palette.divider,
	},
}));
