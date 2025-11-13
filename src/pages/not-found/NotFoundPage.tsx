import { Typography } from '@mui/material';
import { Link } from 'react-router';


export default function NotFoundPage ()
{
	return (
		<Typography
			component='div'
			height='100vh'
			display='flex'
			textAlign='center'
			alignItems='center'
			justifyContent='center'
		>
			<div>
				<Typography variant='h4' color='error'>Страница не найдена</Typography>

				<Link to='/economics'>
					<Typography color='info'>На главную</Typography>
				</Link>
			</div>
		</Typography>
	);
}
