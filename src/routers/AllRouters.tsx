import { lazy } from 'react';
import { Route, Routes } from 'react-router';
const VelocityOfMoneyPage = lazy(() => import('src/pages/tests/velocity-of-money/VelocityOfMoneyPage'));
const PlannedIndicatorsPage = lazy(() => import('src/pages/tests/planned-indicators/PlannedIndicatorsPage'));
const WelcomePage = lazy(() => import('src/pages/welcome/WelcomePage'));


export function AllRouters ()
{
	return (
		<Routes>
			<Route path='/economics/tests/1-velocity-of-money' element={ <VelocityOfMoneyPage /> } />
			<Route path='/economics/tests/2-planned-indicators' element={ <PlannedIndicatorsPage /> } />
			<Route path='/economics' element={ <WelcomePage /> } />
		</Routes>
	);
}
