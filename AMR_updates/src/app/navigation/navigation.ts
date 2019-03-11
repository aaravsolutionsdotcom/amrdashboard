export class Navigation{
	navigation = [

		{
			id: 'home',
			title: 'Home',
			type: 'group',
			children: [
				{
					id: 'dashboard',
					title: 'Dashboard',
					type: 'item',
					icon: 'dashboard',
					url: '/dashboard'
				},
				{
					id: 'recentData',
					title: 'Recent Data',
					type: 'item',
					icon: 'bar_chart',
					url: '/recent-data'
				},
				{
					id: 'device',
					title: 'Devices',
					type: 'item',
					icon: 'tab',
					url: '/devices'
				},
				{
					id: 'report',
					title: 'Reports',
					type: 'item',
					icon: 'assignment',
					url: '/reports'
				},
				{
					id: 'user',
					title: 'User',
					type: 'item',
					icon: 'person',
					url: '/user-profile'
				}
			]
		}
	];
	}
