let userDetails;

export const setUserDetails = (value) => { userDetails = value }
export const getUserDetails = () => { return userDetails }

let tabNavMenu;

export const setTabNavMenu = (value = []) => { tabNavMenu = value }
export const getTabNavMenu = () => { return tabNavMenu }

let drawerNavMenu;
export const setDrawerNavMenu = (value = []) => { drawerNavMenu = value }
export const getDrawerNavMenu = () => { return drawerNavMenu }