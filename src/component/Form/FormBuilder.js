import { View, Text, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { _FIELD_TYPE } from "./FormConfig";
import CustomTextInput from "./CustomInputs/CustomTextInput";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { showAlert } from "react-native-customisable-alert";
import { useNavigation } from "@react-navigation/native";
import Styles from "../../Styles/Styles";
import { _APP_FONT_SIZE_CONSTANTS } from "../../Styles/TextStyles";
import { _GLOBAL_COLORS, __GLOBAL_COLORS } from "../../Styles/StylesConstants";
import LottieView from "lottie-react-native";
import { localized } from "../CommonUtil/CommonUtil";

const fixEmptyObjRef = {}; // every render setting a new obj causing multiple render.

const FormBuilder = forwardRef(({
    formDate,
    onSubmitHandler,
    submitTitle = "Submit",
    dropdownList = [],
    dropDownPayload = fixEmptyObjRef,
    defaultValues = {},
    visibility = {},
    dataManager,
    isLoading = false,
    jsxElement = null,
    dynamicDisabled = fixEmptyObjRef
}, ref) => {
    const tabBarHeight = 0;
    try {
        tabBarHeight = useBottomTabBarHeight();
    } catch (err) {

    }

    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(0);
    const [isPortrait, setIsPortrait] = useState(Dimensions.get('screen').width < Dimensions.get('screen').height);
    const [data, setData] = useState({});
    const [visibilityData, setVisibilityData] = useState({});
    const [forceUpdateValid, setForceUpdateValid] = useState(false);
    const mandatory = useRef({});
    const scroll = useRef(null);

    const OnVisibilityChangeHandler = (page, identifier, value) => {
        setVisibilityData((prevData) => ({
            ...visibility,
            ...prevData,
            [identifier]: value
        }))
    }

    const OnInputChangeHandler = (page, identifier, value) => {
        setData((current) => ({
            ...current,
            [identifier]: value
        }));
        dataManager ? dataManager(data) : null;
    };

    const UpdateMandatory = (id, value) => {
        let data = { ...mandatory.current };
        data[id] = value;
        mandatory.current = data;
    }

    const renderCurrentPage = () => {
        const currentPageData = formDate[currentPage];
        const form = [];

        form.push(
            currentPageData?.title && (
                <Text
                    key={`page-${currentPage}-title`}
                    style={[Styles.FormPageTitle(isPortrait), {
                        display: currentPageData.title === "" ? 'none' : 'flex',
                        ..._APP_FONT_SIZE_CONSTANTS.HEADER
                    }]}>
                    {(currentPageData.title)}
                </Text>
            )
        );

        currentPageData.fields.forEach((field, index) => {
            switch (field.type) {
                case _FIELD_TYPE.TEXTINPUT:
                    form.push(
                        <CustomTextInput
                            key={`page-${currentPage}-field-${index}-input`}
                            isPortrait={isPortrait}
                            fieldData={field}
                            onEndData={OnInputChangeHandler.bind(this, currentPageData.title)}
                            filledData={data?.[field._id]}
                            defaultValues={defaultValues}
                            UpdateMandatory={UpdateMandatory}
                            forceUpdateValid={forceUpdateValid}
                            visibilityData={visibilityData}
                            dynamicDisabled={dynamicDisabled}
                        />
                    );
                    break;
                default:
                    break;
            }
        });

        return form;
    };

    const handleNextPage = () => {
        if (currentPage < formDate.length - 1) {
            const filteredIds = formDate[currentPage].fields.reduce((prev, obj) => {
                const data = prev;
                const value = mandatory.current[obj._id];
                return { ...data, ...{ [obj._id]: value } }
            }, {});
            if (Object.values(filteredIds).some(value => value == false)) {
                console.log(JSON.stringify(mandatory.current));
                setForceUpdateValid(true);
                showAlert({
                    title: localized('incomplete_info_lbl'),
                    message: localized('please_fill_mandatory_fields_lbl'),
                    alertType: 'error',
                    customIcon :<LottieView style={Styles.AlertLottie()} source={require('./../../images/lottie_json/Animation-Error.json')} autoPlay loop/>,
                    onPress: () => {
                        setForceUpdateValid(false)
                    }
                })
            } else {
                setCurrentPage(currentPage + 1);
                scroll.current.scrollTo({ y: 0, animated: true })
            }
        } else {
            submit()
        }
    };

    const handlePreviousPage = () => {
        if (currentPage != 0) {
            setCurrentPage(currentPage - 1);
        } else {
            navigation.goBack();
        }
    };

    useImperativeHandle(ref, () => ({
        handlePreviousPage
    }));


    const submit = () => {
        if (Object.values(mandatory.current).some(value => value == false)) {
            setForceUpdateValid(true);
            console.log(JSON.stringify(mandatory.current));
            showAlert({
                title: localized('incomplete_info_lbl'),
                message: localized('please_fill_mandatory_fields_lbl'),
                alertType: 'error',
                customIcon :<LottieView style={Styles.AlertLottie()} source={require('./../../images/lottie_json/Animation-Error.json')} autoPlay loop/>,
                onPress: () => {
                    setForceUpdateValid(false)
                }
            })
        } else {
            console.log("Success");
            onSubmitHandler(data)
        }
    }

    return (
        <View
            style={{ flex: 1 }}
            onLayout={() => {
                setIsPortrait(Dimensions.get('screen').width < Dimensions.get('screen').height)
            }}>
            <KeyboardAvoidingView
                behavior='height'
                enabled
            >
                <ScrollView
                    ref={scroll}
                    keyboardShouldPersistTaps={'never'}
                    style={{
                        marginBottom: (tabBarHeight * 2.5)
                    }}>
                    {renderCurrentPage()}
                    {typeof jsxElement == 'object' ? jsxElement : jsxElement(data)}
                    {formDate.length > 1 ?
                        (<View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: '5%',
                            marginTop: '5%'
                        }}>
                            <TouchableOpacity
                                disabled={currentPage == 0}
                                style={[Styles.ButtonStyle(isPortrait), {
                                    width: '45%',
                                    backgroundColor: currentPage == 0 ? _GLOBAL_COLORS.DISABLED : _GLOBAL_COLORS.BUTTON_COLOR
                                }]}
                                onPress={handlePreviousPage}>
                                <Text style={Styles.ButtonText(isPortrait)}>{('Back').toUpperCase()}</Text>
                            </TouchableOpacity>
                            {(currentPage == formDate.length - 1) ?
                                (<TouchableOpacity
                                    style={[Styles.ButtonStyle(isPortrait), {
                                        width: '45%'
                                    }]}
                                    onPress={submit}>
                                    <Text style={Styles.ButtonText(isPortrait)}>{submitTitle.toUpperCase()}</Text>
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity
                                    style={[Styles.ButtonStyle(isPortrait), {
                                        width: '45%'
                                    }]}
                                    onPress={handleNextPage}>
                                    <Text style={Styles.ButtonText(isPortrait)}>{('Next').toUpperCase()}</Text>
                                </TouchableOpacity>)
                            }
                        </View>)
                        :
                        (<View style={{ marginTop: '5%' }}>
                            <TouchableOpacity
                                disabled={isLoading}
                                style={Styles.ButtonStyle(isPortrait)}
                                onPress={submit}>
                                {isLoading ?
                                    <ActivityIndicator size={'large'} color={__GLOBAL_COLORS.WHITE} /> :
                                    <Text style={Styles.ButtonText(isPortrait)}>{submitTitle.toUpperCase()}</Text>
                                }
                            </TouchableOpacity>
                        </View>)
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
});

export default FormBuilder;