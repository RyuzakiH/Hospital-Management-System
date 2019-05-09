export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            //badge: {
            //    variant: 'info',
            //    text: 'NEW',
            //},
        },
        {
            name: 'Patients',
            url: '/patients',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'All Patients',
                    url: '/patients',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Add Patient',
                    url: '/patients/add',
                    icon: 'icon-puzzle',
                },
            ],
        },
        {
            name: 'Doctors',
            url: '/doctors',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'All Doctors',
                    url: '/doctors',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Add Doctor',
                    url: '/doctors/add',
                    icon: 'icon-puzzle',
                },
            ],
        },
        {
            name: 'Nurses',
            url: '/nurses',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'All Nurses',
                    url: '/nurses',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Add Nurse',
                    url: '/nurses/add',
                    icon: 'icon-puzzle',
                },
            ],
        },
        {
            name: 'Rooms',
            url: '/rooms',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'All Rooms',
                    url: '/rooms',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Add Room',
                    url: '/rooms/add',
                    icon: 'icon-puzzle',
                },
            ],
        },
        {
            name: 'Users',
            url: '/users',
            icon: 'icon-puzzle'
        },
    ],
};
