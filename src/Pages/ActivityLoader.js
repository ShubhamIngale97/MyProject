import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { _GLOBAL_COLORS } from '../Styles/StylesConstants';

const ActivityLoader = ({ loading = false }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={loading}
            animationInTiming={2000}
            animationOutTiming={2000}
        >
            <LottieView
                style={styles.lottie}
                source={require("../images/lottie_json/Animation-Loader.json")}
                autoPlay
                loop
            />

        </Modal>
    );
}

export default ActivityLoader;

const styles = StyleSheet.create({
    lottie: {
        flex: 1,
        backgroundColor: _GLOBAL_COLORS.BACKDROP_COLOR
    }
})