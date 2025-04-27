import React from 'react';
import { View } from 'react-native';
import { localized } from '../component/CommonUtil/CommonUtil';
import { _HEADER_TYPE } from '../Util/GlobalConstant';
import HeaderComponent from '../component/HeaderComponent';

function Profile(props) {
    return (
       <View>
        <HeaderComponent
       type={_HEADER_TYPE.HOME}
       pagename={localized('profile_lbl')}
       /> 
       </View>
    );
}

export default Profile;