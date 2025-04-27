import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { _HEADER_TYPE } from '../Util/GlobalConstant'
import Styles from '../Styles/Styles'
import { _GLOBAL_COLORS } from '../Styles/StylesConstants'
import { _APP_FONT_SIZE_CONSTANTS } from '../Styles/TextStyles'

const HeaderComponent = (props) => {
    const {
        type,
        pagename,
        BackHandler,
    } = props;

    const navigation = useNavigation()

    const HeaderRender = () => {
        switch (type) {
            case _HEADER_TYPE.HOME:
                return (
                    <View style={[Styles.LoginHeaderMain(), { backgroundColor: _GLOBAL_COLORS.APP_COLOR }]}>
                        <Text style={{ ..._APP_FONT_SIZE_CONSTANTS.BOLDTEXT, color: _GLOBAL_COLORS.WHITE }}>{pagename.toUpperCase()}</Text>
                    </View>
                )
            case _HEADER_TYPE.HOME_PAGE:
                return (
                    <View style={Styles.LoginHeaderMain()}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                if (BackHandler) {
                                    BackHandler()
                                } else {
                                    navigation.goBack()
                                }
                            }}
                        >
                            <FontAwesome
                                name="arrow-left"
                                size={15}
                                style={{ paddingRight: 5 }}
                                color={_GLOBAL_COLORS.BLACK}
                            />
                            <Text style={Styles.BoldText()}>
                                {pagename.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            case _HEADER_TYPE.PAGE:
                return (
                    <View style={[Styles.LoginHeaderMain(),
                    {
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }
                    ]}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                if (BackHandler) {
                                    BackHandler()
                                } else {
                                    navigation.goBack()
                                }
                            }}
                        >
                            <FontAwesome
                                name="arrow-left"
                                size={15}
                                style={{ paddingRight: 5 }}
                                color={_GLOBAL_COLORS.WHITE}
                            />
                            <Text style={[Styles.BoldText(),{color:_GLOBAL_COLORS.TEXT_COLOR_WHITE,..._APP_FONT_SIZE_CONSTANTS.HEADER}]}>
                                {pagename.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            default:
                return (
                    <View>
                        <Text>Default</Text>
                    </View>
                )
        }
    }

    return (
        <>
            {HeaderRender()}
        </>
    )
}
export default HeaderComponent