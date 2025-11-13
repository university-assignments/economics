import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
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
		modified_at: new Date('2025-10-13 21:45:00'),
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
	{
		modified_at: new Date('2025-10-27 21:18'),
		title: 'Уровень жизни населения',

		path: 'tests/4-standard-living-population',
		search: new URLSearchParams({
			P1: '75.3',
			P2: '99',
			P3: '89',
			P4: '21983',

			H1: '32',
			H2: '25.1',
			H31: '66',
			H32: '17',
			H33: '24',

			N1: '9',
			N2: '17',
			N3: '12.9',
			N4: '2.6',
		}),
	},
	{
		modified_at: new Date('2025-11-13 18:55'),
		title: 'Тренд заработной платы',

		path: 'tests/5-salary-trend',
		search: new URLSearchParams({
			x: [ '31', '18', '26', '16', '26', '45', '29', '34', '31', '35', '33', '48' ].join('|'),
			t: [ '-6', '-5', '-4', '-3', '-2', '-1', '1', '2', '3', '4', '5', '6' ].join('|'),
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
								secondary={ 'последнее изменение: ' + formatDistanceToNow(section.modified_at, {
									addSuffix: true,
									locale: ru,
								}) }
							/>
						</ListItem>

						<Divider />
					</Fragment>
				))
			}
		</List>
	);
}
