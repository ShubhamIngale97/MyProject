import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  _APP_STYLES_CONSTANTS,
  _GLOBAL_COLORS,
} from "../Styles/StylesConstants.js";
import { _APP_FONT_SIZE_CONSTANTS } from "../styles/TextStyles";
import { _TAB_ARRAY } from "./NavArray.js";
import { GetRenderIcons } from "../Util/GlobalFunction.js";
import { TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useEffect, useRef } from "react";
import { getTabNavMenu } from "../Util/Details.js";

const Tab = createBottomTabNavigator();

const DrawerOpener = ({ navigation }) => ({
  tabPress: (e) => {
    e.preventDefault();
    navigation.openDrawer(); // This opens the drawer
  },
});

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const iconName = focused ? item.activeIconName : item.inActiveIconName;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.5 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5 }, 1: { scale: 1 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {GetRenderIcons(item.iconType, iconName, focused ? 25 : item.route === 'HomeNav' ? 30 : undefined)}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const TabNav = () => {
  const menu = getTabNavMenu();

  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }
      })}
    >
      {_TAB_ARRAY.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => {
                const iconName = focused ? item.activeIconName : item.inActiveIconName;
                return GetRenderIcons(item.iconType, iconName);
              },
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
            listeners={({ navigation }) =>
              item.route === 'NullComp'
                ? DrawerOpener({ navigation })
                : item.route === 'HomeNav' ? {
                  tabPress: (e) => {
                    e.preventDefault();
                    global.HomefeatureCode = undefined;
                    navigation.navigate('Home');
                  },
                } : undefined
            }
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNav;
