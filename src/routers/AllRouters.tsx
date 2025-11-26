import { lazy } from 'react';
import { Route, Routes } from 'react-router';

/* 1 */ const VelocityOfMoneyPage = lazy(() => import('src/pages/tests/velocity-of-money/VelocityOfMoneyPage'));
/* 2 */ const PlannedIndicatorsPage = lazy(() => import('src/pages/tests/planned-indicators/PlannedIndicatorsPage'));
/* 3 */ const IndexesPage = lazy(() => import('src/pages/tests/3-indexes/IndexesPage'));
/* 4 */ const StandardLivingPopulationPage = lazy(() => import('src/pages/tests/4-standard-living-population/StandardLivingPopulationPage'));
/* 5 */ const SalaryTrendPage = lazy(() => import('src/pages/tests/5-salary-trend/SalaryTrendPage'));
const WelcomePage = lazy(() => import('src/pages/welcome/WelcomePage'));
const NotFoundPage = lazy(() => import('src/pages/not-found/NotFoundPage'));


export function AllRouters ()
{
	return (
		<Routes>
			<Route path='/economics/tests/1-velocity-of-money' element={ <VelocityOfMoneyPage /> } />
			<Route path='/economics/tests/2-planned-indicators' element={ <PlannedIndicatorsPage /> } />
			<Route path='/economics/tests/3-indexes' element={ <IndexesPage /> } />
			<Route path='/economics/tests/4-standard-living-population' element={ <StandardLivingPopulationPage /> } />
			<Route path='/economics/tests/5-salary-trend' element={ <SalaryTrendPage /> } />

			<Route path='/economics' element={ <WelcomePage /> } />
			<Route path='*' element={ <NotFoundPage /> } />
		</Routes>
	);
}
