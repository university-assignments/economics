import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router';


interface Section
{
	modified_at: Date;
	title: string;

	path: string;
	search: URLSearchParams;
}

const SECTIONS: Section[] = [
	{
		modified_at: new Date('2025-09-18'),
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
		modified_at: new Date('2025-09-29'),
		title: 'Плановые показатели',

		path: 'tests/2-planned-indicators',
		search: new URLSearchParams({
			fuel: [ 'Мазут', 'Уголь', 'Газ' ].join('|'),
			units: [ 'Т', 'Т', '1000 М^3' ].join('|'),
			base: [ 550, 350, 650 ].join('|'),
			plan: [ 500, 320, 650 ].join('|'),
			fact: [ 520, 300, 690 ].join('|'),
			k: [ 1.37, 0.9, 1.2 ].join('|'),
		}),
	},
	{
		modified_at: new Date('2025-10-09'),
		title: 'Индексы',

		path: 'tests/3-indexes',
		search: new URLSearchParams({
			products: [ 'A', 'B', 'C' ].join('|'),
			releases1: [ 2500, 3000, 3600 ].join('|'),
			releases2: [ 2610, 2950, 3700 ].join('|'),
			prices1: [ 4800, 7100, 5000 ].join('|'),
			prices2: [ 5400, 7600, 5700 ].join('|'),
		}),
	},
];

export default function WelcomePage ()
{
	const navigate = useNavigate();

	return (
		<List>
			{
				SECTIONS.map((section, index) => (
					<Fragment key={section.path}>
						<ListItem onClick={() => navigate(section.path + '?' + section.search)}>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: '#2196f3' }}>{index + 1}</Avatar>
							</ListItemAvatar>

							<ListItemText
								primary={section.title}
								secondary={ 'последнее изменение: ' + section.modified_at.toLocaleDateString() }
							/>
						</ListItem>

						<Divider />
					</Fragment>
				))
			}
		</List>
	);
}
