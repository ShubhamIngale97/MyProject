import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { I18nManager } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { _ICON_TYPE } from "../../../Util/GlobalConstant";
import Styles from "../../../Styles/Styles";
import { _APP_STYLES_CONSTANTS, _GLOBAL_COLORS } from "../../../Styles/StylesConstants";
import { _VALIDATIONS } from "../ValidationFunctions";
import { GetRenderIcons } from "../../../Util/GlobalFunction";

const CustomTextInput = props => {
    const navigation = useNavigation();
    let { isPortrait, fieldData, onEndData, filledData = "", UpdateMandatory, forceUpdateValid, visibilityData = {}, defaultValues = {}, dynamicDisabled = {} } = props;

    const [value, setValue] = useState(filledData);
    const [hide, setHide] = useState(fieldData.secureText);
    const [error, setError] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (filledData != '') return;
        UpdateMandatory(fieldData._id, !fieldData?.mandatory);
    }, []);

    useEffect(() => {
        if (filledData != '') return;
        if (!isVisible) {
            onEndData(fieldData._id, '')
            UpdateMandatory(fieldData._id, true)
            setValue('');
        }
        else { //TODO needs to be fixed if broken
            onEndData(fieldData._id, '')
            UpdateMandatory(fieldData._id, !fieldData?.mandatory);
            setValue('');
        }
    }, [isVisible]);

    useEffect(() => {
        setIsDisabled(fieldData.disabled === true || dynamicDisabled[fieldData._id]);
        if (fieldData.hasDefaultValue && defaultValues.hasOwnProperty(fieldData._id)) {
            setValue(defaultValues[fieldData._id])
            setError(false);
            onEndData(fieldData._id, defaultValues[fieldData._id]);
            UpdateMandatory(fieldData._id, true);
        }
    }, [defaultValues])

    useEffect(() => {
        fieldData.visibilityManagedBy && (setIsVisible(visibilityData[fieldData.visibilityManagedBy] || false))
    }, [visibilityData])

    useEffect(() => {
        if (forceUpdateValid) {
            if (fieldData.mandatory && filledData === '') {
                setError(true)
            }
        }
    }, [forceUpdateValid]);

    return (
        <View style={{
            display: isVisible ? 'flex' : 'none'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextInput
                    key={fieldData._id}
                    style={{
                        flex: 1,
                        marginHorizontal: '5%',
                        marginVertical: '2%',
                        overflow: "hidden"
                    }}
                    disabled={isDisabled}
                    theme={Styles.TextInputThemeStyle(isPortrait)}
                    outlineColor={_GLOBAL_COLORS.GREY_COLOR}
                    outlineStyle={{
                        ..._APP_STYLES_CONSTANTS.BORDER_RADIUS
                    }}
                    textColor={_GLOBAL_COLORS.TEXT_COLOR_4}
                    label={(fieldData.name) + (fieldData.mandatory ? ' *' : '')}
                    mode={fieldData.mode}
                    maxLength={fieldData.pattern?.fixLength || fieldData.pattern?.maxLength}
                    autoCapitalize={fieldData.autoCapitalize}
                    secureTextEntry={hide}
                    value={value}
                    autoComplete={fieldData.textContentType || "off"}
                    textContentType={fieldData.autoComplete || "none"}
                    keyboardType={fieldData.keyboardType}
                    contextMenuHidden={fieldData.contextMenuHidden}
                    onFocus={() => {
                        setError(false)
                    }}
                    onBlur={() => {
                        if (fieldData.mandatory && value === '') {
                            setError(true);
                        }
                    }}
                    onChange={(data) => {
                        let value = data.nativeEvent.text;
                        if (fieldData.autoCapitalize == "characters") {
                            value = value.toUpperCase();
                        }
                        setValue(value);
                        if (fieldData.fieldValidation && fieldData.fieldValidation != "") {
                            fieldData.fieldValidation && !_VALIDATIONS[fieldData.fieldValidation](value, fieldData.pattern, callback => {
                                if (!callback.status) {
                                    setError(true);
                                    fieldData.mandatory ? UpdateMandatory(fieldData._id, false) : {};
                                    if (callback.message) {
                                        fieldData.error = callback.message
                                    }
                                } else {
                                    if (callback.type == 1) {
                                        onEndData(fieldData._id, callback.value);
                                        setValue(callback.value)
                                    }
                                    setError(false);
                                    fieldData.mandatory ? UpdateMandatory(fieldData._id, true) : {};
                                }
                            })
                        }
                    }}
                    onEndEditing={onEndData.bind(this, fieldData._id, value)}
                />
                {fieldData.hasOwnProperty('allowBarcodeScan') && fieldData.allowBarcodeScan &&
                    <TouchableOpacity disabled={isDisabled} onPress={() => {
                        openScanner(_SCANNER_TYPE.BARCODE, navigation, (text) => {
                            setValue(text);
                            onEndData(fieldData._id, text)
                            if (fieldData.fieldValidation && fieldData.fieldValidation != "") {
                                fieldData.fieldValidation && !_VALIDATIONS[fieldData.fieldValidation](text, fieldData.pattern, callback => {
                                    if (!callback.status) {
                                        setError(true);
                                        fieldData.mandatory ? UpdateMandatory(fieldData._id, false) : {};
                                    } else {
                                        setError(false);
                                        fieldData.mandatory ? UpdateMandatory(fieldData._id, true) : {};
                                    }
                                })
                            }
                        });
                    }}>
                        {GetRenderIcons(_ICON_TYPE.MATERIALCOMMUNITYICONS, 'qrcode-scan', 25, isDisabled ? _GLOBAL_COLORS.DISABLED : undefined)}
                    </TouchableOpacity>
                }
            </View>
            {error && !isDisabled && (
                <Text style={{
                    color: _GLOBAL_COLORS.ERROR_TEXT,
                    textAlign: "center"
                }}>{(fieldData.error)}</Text>
            )}
            {fieldData.secureText && (
                <FontAwesome
                    name={hide ? 'eye-slash' : 'eye'}
                    size={25}
                    color={_GLOBAL_COLORS.APP_COLOR}
                    style={{ position: 'absolute', marginLeft: I18nManager.isRTL ? '65%' : '85%', marginTop: isPortrait ? '7%' : '4%' }}
                    onPress={() =>
                        setHide((current) => !current)
                    }
                />
            )}
        </View>
    )
}

export default CustomTextInput;