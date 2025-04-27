import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from '../component/HeaderComponent';
import { _HEADER_TYPE } from '../Util/GlobalConstant';
import { localized } from '../component/CommonUtil/CommonUtil';
import LottieView from 'lottie-react-native';
import { _GLOBAL_COLORS } from '../Styles/StylesConstants';

function PageNotFound(props) {
    return (
        <View style={{
            flex:1
        }}>
            <HeaderComponent
                type={_HEADER_TYPE.PAGE}
                pagename={localized('page_not_found_lbl')}
            />
            <LottieView
                style={styles.lottie}
                source={require("../images/lottie_json/page-not-found.json")}
                autoPlay
                loop
            />
            </View>
    );
}

export default PageNotFound;

const styles = StyleSheet.create({
    lottie: {
        flex: 1,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor: _GLOBAL_COLORS.WHITE
    }
})