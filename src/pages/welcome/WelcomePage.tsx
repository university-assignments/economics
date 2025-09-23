import { Link } from 'react-router';


const SECTIONS = [
	{
		title: 'Скорость обращения денег',
		path: 'tests/1-velocity-of-money',
		search: new URLSearchParams({
			Q_0: '9043.8',
			Q_1: '10865.3',
			M_0: '3615.2',
			M_1: '3770',
			N_0: '1370',
			N_1: '1350',
		}),
	},
];

export default function WelcomePage ()
{
	return (
		<ol>
			{
				SECTIONS.map((section) => (
					<li key={section.path}>
						<Link to={ section.path + '?' + section.search }>
							{section.title}
						</Link>
					</li>
				))
			}
		</ol>
	);
}
