import React, { Fragment, createContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/component/SplashScreen';
import { _GLOBAL_COLORS } from './src/Styles/StylesConstants';
import Styles from './src/Styles/Styles';
import { _APP_FONT_SIZE_CONSTANTS } from './src/Styles/TextStyles';
import { updateInitialSetUp } from './src/Util/GlobalFunction';
import PageNotFound from './src/Navigation/PageNotFound';
import LoginNav from './src/Navigation/LoginNav';
import DrawerNav from './src/Navigation/DrawerManager/DrawerNav';
import CustomisableAlert from 'react-native-customisable-alert';
import TabNav from './src/Navigation/TabNav';


export const GlobalContext = createContext({
  setLoginStatus: () => { },
});

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(true);

  const navigationRef = useNavigationContainerRef();  // Navigation ref for programmatic control

  useEffect(() => {
    updateInitialSetUp((flag) => {
      setLoginStatus(flag);
    });
    const splashScreen = setTimeout(() => {
      setShowSplashScreen(false);
      StatusBar.setHidden(false);
    }, 3000);

    return () => {
      clearTimeout(splashScreen);
    };
  }, []);

  const setLoginStatus = (flag) => {
    console.log("setLoginStatus"+flag);
    
    setIsLogin(flag);
  };

  return (
    <Fragment>
      <StatusBar backgroundColor={_GLOBAL_COLORS.BLACK} />
      {showSplashScreen ? (
        <View style={{ flex: 1 }}>
          <SplashScreen />
        </View>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: showSplashScreen ? _GLOBAL_COLORS.BACKDROP_COLOR : _GLOBAL_COLORS.BLACK,
          }}>
          <GlobalContext.Provider value={{ setLoginStatus }}>
            <NavigationContainer
              ref={navigationRef}
              onUnhandledAction={(action) => {
                if (action.type === 'NAVIGATE' && action.payload?.name) {
                  const availableRoutes = navigationRef.getState()?.routes.map(r => r.name) || [];
                  if (!availableRoutes.includes(action.payload.name)) {
                    navigationRef.navigate('PageNotFound');
                  }
                }
              }}
            >
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: _GLOBAL_COLORS.WHITE,
                  },
                }}>
                {!isLogin ? (
                  <Stack.Group>
                    <Stack.Screen name="LoginNav" component={LoginNav} />
                    {/* <Stack.Screen name="DrawerNav" component={DrawerNav} /> */}
                  </Stack.Group>
                ) : (
                  <Stack.Screen name='TabNav' component={TabNav} />
                )}
                <Stack.Screen name="PageNotFound" component={PageNotFound} />
              </Stack.Navigator>
            </NavigationContainer>
          </GlobalContext.Provider>
          <CustomisableAlert
            titleStyle={{ ..._APP_FONT_SIZE_CONSTANTS.HEADER }}
            btnStyle={Styles.CustomisableAlertButtonStyle()}
            btnLeftStyle={Styles.CustomisableAlertButtonLeftStyle()}
            btnLabelStyle={Styles.CustomisableAlertButtonLabelStyle()}
            btnLeftLabelStyle={Styles.CustomisableAlertButtonLeftRightLabelStyle()}
            btnRightLabelStyle={Styles.CustomisableAlertButtonLeftRightLabelStyle()}
          />
        </SafeAreaView>
      )}
    </Fragment>
  );
}

export default App;