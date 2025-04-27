import React, { useContext, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import {  _HEADER_TYPE } from '../Util/GlobalConstant';
import Styles from '../Styles/Styles';
import { _GLOBAL_COLORS } from '../Styles/StylesConstants';
import FormBuilder from '../component/Form/FormBuilder';
import { _FORMS } from '../component/Form/FormConfig';
import { _storeData, LoginUsingFireBase, ShowErrorAlert, ShowSuccessAlert } from '../Util/GlobalFunction';
import { localized } from '../component/CommonUtil/CommonUtil';
import ActivityLoader from './ActivityLoader';
import { GlobalContext } from '../../App';
import { setInitialSetUp } from '../Util/Utility';
import { ASYNC_KEYS } from '../Util/Constants';



function Login(props) {
    const [isLoading, setIsLoading] = useState(false)
    const { setLoginStatus } = useContext(GlobalContext)


    const Dologin = (data) => {
        setIsLoading(true)
        LoginUsingFireBase(data.uname, data.password, (flag, message) => {
            if (flag) {
                setInitialSetUp(data, (flag) => {
                    setIsLoading(false)
                    if (flag) {
                        ShowSuccessAlert(
                            flag => {
                                _storeData(ASYNC_KEYS.IS_LOGGED_IN, "true", (data) => {
                                    setLoginStatus(false)
                                })
                            },
                            localized('success_alert_lbl'),
                            message
                        );
                    } else {
                        ShowErrorAlert(
                            flag => { },
                            localized('login_Fail_lbl'),
                            localized('error_message_lbl')
                        )
                    }

                })
            } else {
                setIsLoading(false)
                ShowErrorAlert(
                    flag => { },
                    localized('login_Fail_lbl'),
                    message
                )
            }
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: _GLOBAL_COLORS.WHITE }}>
            <ScrollView>
                <Image
                    source={require('../images/login_img.jpg')}
                    backgroundColor={'tintColor'}
                    style={[Styles.LogoStyle(), { marginTop: 100 }]} />
                <FormBuilder
                    formDate={_FORMS.LOGIN}
                    submitTitle={'login'}
                    onSubmitHandler={Dologin} />
            </ScrollView>
            <ActivityLoader loading={isLoading} />
        </View>
    );
}

export default Login;