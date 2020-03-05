import Auth from '@/screens/Auth/Auth'
import AdvertisementScreen from '@/screens/AdvScreen/AdvertisementScreen';
import AdvModeration from '@/screens/AdvModeration/AdvModeration';
import AdvertisementsList from '@/screens/AdvScreen/AdvertisementsList/AdvertisementsList'
import AdmittedAdvertisements from '@/screens/AdvScreen/AdmittedAdvertisements/AdmittedAdvertisements'

// [TODO] Add protection in beforeEach hook
const routes = [
    {
        path: "/",
        name: "auth",
        component: Auth
    },
    {
        path: '/adv',
        name: 'AdvertisementScreen',
        component: AdvertisementScreen,
        children: [
            {
              path: 'all',
              component: AdvertisementsList
            },
            {
              path: 'admitted',
              component: AdmittedAdvertisements
            }
          ]
    },
    {
        path: '/moderation',
        name: 'Moderation',
        component: AdvModeration
    }
];

export default routes;
