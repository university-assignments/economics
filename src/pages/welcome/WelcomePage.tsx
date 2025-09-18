import { Link } from 'react-router';


const SECTIONS = [
	{
		title: 'Скорость обращения денег',
		path: 'tests/1-velocity-of-money',
	},
];

export function WelcomePage ()
{
	return (
		<ol>
			{
				SECTIONS.map((section) => (
					<li key={section.path}>
						<Link to={section.path}>
							{section.title}
						</Link>
					</li>
				))
			}
		</ol>
	);
}
