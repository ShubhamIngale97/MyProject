import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNav from '../TabNav'; // Import TabNav component
import DrawerNavContent from '../DrawerNavContent'; // Your custom drawer content
import { _APP_STYLES_CONSTANTS } from '../../Styles/StylesConstants';

function DrawerNav(props) {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            initialRouteName="TabNav"
            screenOptions={{
                headerShown: false,
                drawerContentContainerStyle: {
                    ..._APP_STYLES_CONSTANTS.APP_BACKGROUND_COLOR,
                },
                drawerPosition: 'right',  // Drawer opens from the right side
            }}
            drawerContent={() => <DrawerNavContent />}  // Custom Drawer Content
        >
            <Drawer.Screen name='TabNav' component={TabNav} /> {/* TabNav inside the drawer */}
        </Drawer.Navigator>
    );
}

export default DrawerNav;
