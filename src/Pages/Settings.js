import React from 'react';
import { View } from 'react-native';
import HeaderComponent from '../component/HeaderComponent';
import { _HEADER_TYPE } from '../Util/GlobalConstant';
import { localized } from '../component/CommonUtil/CommonUtil';

function Settings(props) {
    return (
        <View style={{
            flex: 1
        }}>
            <HeaderComponent
                type={_HEADER_TYPE.PAGE}
                pagename={localized('settings_lbl')}
            />
        </View>
    );
}

export default Settings;