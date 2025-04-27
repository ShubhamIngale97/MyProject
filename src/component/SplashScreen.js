import LottieView from "lottie-react-native";
import { View, Image, StatusBar, Text } from "react-native";
import Styles from "../Styles/Styles";

const SplashScreen = props => {
StatusBar.setHidden(true)

    return (
        <View style={Styles.SplashScreenMain()}>
            <LottieView
                style={Styles.SplashScreenLottie()}
                source={require('../images/lottie_json/splash_animation.json')}
                autoPlay
                loop
            />
        </View>
    )
};

export default SplashScreen;