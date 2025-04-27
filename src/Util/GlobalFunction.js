import { _ASYNC_KEYS, _ICON_TYPE } from "./GlobalConstant";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { _GLOBAL_COLORS } from "../Styles/StylesConstants";
import { Alert, I18nManager, Platform } from "react-native";
import { localized } from "../component/CommonUtil/CommonUtil";
import { closeAlert, showAlert } from "react-native-customisable-alert";
import Styles from "../Styles/Styles";
import auth from '@react-native-firebase/auth';
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_KEYS } from "./Constants";

export const GetRenderIcons = (iconType, name, size = 20, color = _GLOBAL_COLORS.BUTTON_COLOR, style = { marginRight: I18nManager.isRTL ? '5%' : '5%' }) => {
  switch (iconType) {
    case _ICON_TYPE.FONTAWESOME:
      return (
        <FontAwesome
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.FONTAWESOME5:
      return (
        <FontAwesome5
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.ANTDESIGN:
      return (
        <AntDesign
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.MATERIALCOMMUNITYICONS:
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.ENTYPO:
      return (
        <Entypo
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.IONICONS:
      return (
        <Ionicons
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.MATERIALICON:
      return (
        <MaterialIcons
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case _ICON_TYPE.FONTISTO:
      return (
        <Fontisto
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    default:
      return (
        <Entypo
          name={'grid'}
          size={size}
          color={color}
          style={style}
        />
      );
  }
};

export const ShowSuccessAlert = (
  callback,
  title = localized('success_title_lbl'),
  message = localized('success_message_lbl'),
  buttonLbl = localized('ok_lbl'),
  customIcon = <LottieView style={Styles.ScuccesAlertLottie()} source={require('../images/lottie_json/Animation-Success.json')} autoPlay loop={false} />
) => {
  showAlert({
    title: title,
    message: message,
    alertType: 'success',
    customIcon: customIcon,
    btnLabel: buttonLbl,
    onPress: () => {
      closeAlert();
      callback && callback(true);
    },
  });
}

export const ShowErrorAlert = (
  callback,
  title = localized('error_title_lbl'),
  message = localized('error_message_lbl'),
  buttonLbl = localized('ok_lbl'),
  customIcon = <LottieView style={Styles.AlertLottie()} source={require('../images/lottie_json/Animation-Error.json')} autoPlay loop={false} />
) => {
  showAlert({
    title: title,
    message: message,
    alertType: "error",
    customIcon: customIcon,
    btnLabel: buttonLbl,
    onPress: () => {
      closeAlert();
      callback && callback(true);
    }
  })
}

export const ShowWarningAlert = (
  callback,
  title = localized('warning_title_lbl'),
  message = localized('warning_message_lbl'),
  leftButtonLbl = localized('no_lbl'),
  rightButtonLbl = localized('yes_lbl'),
  customIcon = <LottieView style={Styles.AlertLottie()} source={require('../images/lottie_json/Animation-Warning.json')} autoPlay loop={false} />
) => {
  showAlert({
    title: title,
    message: message,
    alertType: "warning",
    customIcon: customIcon,
    leftBtnLabel: leftButtonLbl,
    btnLabel: rightButtonLbl,
    onPress: () => {
      closeAlert();
      callback && callback(true);
    },
    onDismiss: () => {
      closeAlert();
      callback && callback(false);
    }
  })

}

export const LoginUsingFireBase = (userName, password, callback) => {
  auth()
    .signInWithEmailAndPassword(userName, password)
    .then(() => {
      if (callback) {
        callback(true, localized('login_Success_lbl'));
      }
    })
    .catch(error => {
      const errorMessage = error.message.split('] ')[1] || "Something went wrong";
      if (callback) {
        callback(false, errorMessage);
      }
    });
};

export const _storeData = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(
      key,
      value,
    );
    callback && callback();
  } catch (error) {
    console.warn('AsyncStorage setItem Error: ' + error);
  }
};

export const _retrieveData = async (key, callback) => {
  if (key === undefined) return;
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      callback && callback(value);
    } else {
      callback && callback();
    }
  } catch (error) {
    console.log('AsyncStorage getItem Error: key ' + key)
    console.warn('AsyncStorage getItem Error: ' + error);
  }
};

export const _deleteData = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key);
    callback && callback(true);
  } catch (e) {
    callback && callback(false);
  }
};

export const updateInitialSetUp = async (callback) => {
  _retrieveData(ASYNC_KEYS.IS_LOGGED_IN, (data) => {    
    if (data != undefined && data == "true") {
      callback(false)
    } else {
      callback(true)
    }
  })
};