import { Route, Routes } from 'react-router';
import { VelocityOfMoneyPage } from 'src/pages/tests/velocity-of-money/VelocityOfMoneyPage';
import { WelcomePage } from 'src/pages/welcome/WelcomePage';


export function AllRouters ()
{
	return (
		<Routes>
			<Route path='/economics/tests/1-velocity-of-money' element={ <VelocityOfMoneyPage /> } />
			<Route path='/economics' element={ <WelcomePage /> } />
		</Routes>
	);
}
