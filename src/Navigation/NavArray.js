import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Pages/Profile"
import HomeNav from "./HomeNav"
import Notification from "../Pages/Notification";

const Tab = createBottomTabNavigator();

const NullComp = () => {
  return null;
};


export const _TAB_ARRAY = [
  {
    route: 'HomeNav',
    label: 'home_lbl',
    iconType: 'MaterialCommunityIcons',
    activeIconName: 'home-circle',
    inActiveIconName: 'home-circle-outline',
    component: HomeNav
  },
  {
    route: 'Profile',
    label: 'profile_lbl',
    iconType: 'FontAwesome',
    activeIconName: 'user',
    inActiveIconName: 'user-o',
    component: Profile
  },
  {
    route: 'Notification',
    label: 'notification_lbl',
    iconType: 'Ionicons',
    activeIconName: 'notifications-circle-sharp', // Corrected icon name
    inActiveIconName: 'notifications-outline', // Corrected icon name
    component: Notification
  },
  {
    route: 'NullComp',
    label: 'more_lbl',
    iconType: 'AntDesign',
    activeIconName: 'menuunfold', // Corrected icon name
    inActiveIconName: 'menu-fold', // Corrected icon name
    component: NullComp
  }
];
export const _DRAWER_ARRAY = [
  {
    name: 'HOME',
    icon: 'home-circle-outline',
    iconType: 'MaterialCommunityIcons',
    submenu: [],
    navigateTo:'Home'
  },
  {
    name: 'MAPS',
    icon: 'map-marker-circle',
    submenu: [
      {
        name: 'Daily',
        icon: 'schedule'
      },
      {
        name: 'Weekly',
        icon: 'calendar-week'
      },
    ],
    iconType: 'MaterialCommunityIcons',
  },
  {
    name: 'GRAPH',
    iconType: 'MaterialIcons',
    icon: 'auto-graph',
    submenu: []
  },
  {
    name: 'SETTINGS',
    iconType: 'MaterialIcons',
    icon: 'settings',
    submenu: [],
    navigateTo:'Settings'
  },
]

export const _SYNC_MENU = [
  {
    name:'categories',
    label:"categories_lbl",
    api:'https://fakestoreapi.com/products/categories',
    iconType: 'MaterialIcons',
    icon: 'category',
  },
  {
    name:'product',
    label:"product_lbl",
    api:'https://fakestoreapi.com/products',
    iconType: 'FontAwesome',
    icon: 'product-hunt',
  },
]