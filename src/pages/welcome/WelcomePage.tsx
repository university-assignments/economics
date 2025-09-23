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
	{
		title: 'Плановые показатели',
		path: 'tests/2-planned-indicators',
		search: new URLSearchParams({
			fuel: [ 'МАЗ', 'Уголь', 'Газ' ].join('|'),
			units: [ 'Т', 'Т', 'м^3' ].join('|'),
			base: [ 550, 350, 650 ].join('|'),
			plan: [ 500, 320, 650 ].join('|'),
			fact: [ 520, 300, 690 ].join('|'),
			k: [ 1.37, 0.9, 1.2 ].join('|'),
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
