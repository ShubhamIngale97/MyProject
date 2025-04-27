import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'; // Import ImageBackground
import { GlobalContext } from '../../App';
import Styles from '../Styles/Styles';
import { _deleteData, GetRenderIcons, ShowWarningAlert } from '../Util/GlobalFunction';
import { _GLOBAL_COLORS } from '../Styles/StylesConstants';
import { localized } from '../component/CommonUtil/CommonUtil';
import { Image } from 'react-native-animatable';
import { _APP_FONT_SIZE_CONSTANTS, _MENU_ICON_SIZE, _SUBMENU_ICON_SIZE } from '../Styles/TextStyles';
import { _DRAWER_ARRAY } from './NavArray';
import { useNavigation } from '@react-navigation/native';
import { ASYNC_KEYS } from '../Util/Constants';
import { _ICON_TYPE } from '../Util/GlobalConstant';
import { getDrawerNavMenu } from '../Util/Details';

function DrawerNavContent(props) {
    const { setLoginStatus } = useContext(GlobalContext);
    const [submenuVisible, setSubmenuVisible] = useState({}); // Track visibility of each submenu
    const [activeItem, setActiveItem] = useState('HOME'); // Track active menu item
    const navigation = useNavigation();
    const menuItems = _DRAWER_ARRAY

    const renderProfileView = () => {
        return (
            <View style={style.profile}>
                <ImageBackground
                    source={require('../images/Profile-Wallpaper.webp')}
                    style={style.header}
                    resizeMode="cover"
                >
                    <Image
                        style={style.profileImage}
                        source={require('../images/MyProfilePhoto.png')}
                    />
                    <Text style={style.name}>SHUBHAM JOTIBA INGALE</Text>
                    <Text style={style.company}>Software Engineer</Text>
                </ImageBackground>
            </View>
        );
    };

    const toggleSubmenu = (itemName) => {
        setSubmenuVisible((prev) => ({
            ...prev,
            [itemName]: !prev[itemName],
        }));
    };

    const renderDrawerMenuView = () => {
        return (
            <View style={style.drawerMenu}>
                {menuItems.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={[
                                style.menuItem,
                                activeItem === item.name && style.activeMenuItem,
                            ]}
                            onPress={() => {
                                if (item.submenu.length > 0) {
                                    toggleSubmenu(item.name);
                                }else{
                                    setSubmenuVisible('');
                                    navigation.navigate(item?.navigateTo || "PageNotFound");
                                }
                                setActiveItem(item.name);
                            }}
                        >
                            {GetRenderIcons(
                                item.iconType ? item.iconType :_ICON_TYPE.MATERIALICON,
                                item.icon,
                                _MENU_ICON_SIZE,
                                activeItem === item.name
                                    ? _GLOBAL_COLORS.APP_COLOR
                                    : _GLOBAL_COLORS.TEXT_COLOR_4
                            )}
                            <Text
                                style={[
                                    style.menuItemText,
                                    activeItem === item.name && style.menuItemTextActive,
                                ]}
                            >
                                {item.name}
                            </Text>
                            {item.submenu.length > 0 && (
                                <View style={style.badge}>
                                    {GetRenderIcons(
                                        _ICON_TYPE.ANTDESIGN,
                                        activeItem === item.name && submenuVisible[item.name] ? 'leftcircle' : 'downcircle',
                                        _SUBMENU_ICON_SIZE,
                                        activeItem === item.name
                                            ? _GLOBAL_COLORS.APP_COLOR
                                            : _GLOBAL_COLORS.TEXT_COLOR_4
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                        {item.submenu.length > 0 && submenuVisible[item.name] && (
                            <View style={style.submenu}>
                                {item.submenu.map((subItem, subIndex) => (
                                    <TouchableOpacity
                                        key={subIndex}
                                        style={style.submenuItem}
                                        onPress={() => {
                                            navigation.navigate(subItem?.navigateTo || "PageNotFound");
                                        }}
                                    >
                                        {GetRenderIcons(
                                            _ICON_TYPE.MATERIALICONS,
                                            subItem.icon,
                                            _SUBMENU_ICON_SIZE,
                                            _GLOBAL_COLORS.TEXT_COLOR_4
                                        )}
                                        <Text style={style.submenuItemText}>{subItem.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {renderProfileView()}
            {renderDrawerMenuView()}
            <View style={style.logoutSection}>
                <TouchableOpacity
                    style={[
                        Styles.ButtonStyle(),
                        { flexDirection: 'row', alignItems: 'center' },
                    ]}
                    onPress={() => {
                        ShowWarningAlert(flag => {
                            if (flag) {                                
                                try{
                                    _deleteData(ASYNC_KEYS.IS_LOGGED_IN, () => {
                                        setLoginStatus(true);
                                    }); 
                                }catch(e){
                                    console.log("_deleteData : "+e);
                                    
                                }
                          
                            }
                        },
                            localized('logout_lbl'),
                            localized('do_you_want_to_logout_lbl'));
                    }}
                >
                    {GetRenderIcons(_ICON_TYPE.MATERIALCOMMUNITYICONS, "logout", undefined, _GLOBAL_COLORS.APP_COLOR)}
                    <Text style={Styles.ButtonText()}>{localized('logout_lbl').toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default DrawerNavContent;

const style = StyleSheet.create({
    profile: {
        height: '10%',
    },
    drawerMenu: {
        height: '80%',
        paddingTop: '50%',
    },
    header: {
        paddingTop: 50,
        alignItems: 'center',
        height: 90,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius:40,
        borderWidth: 2,
        borderColor: _GLOBAL_COLORS.WHITE,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: _GLOBAL_COLORS.APP_COLOR,
        marginTop: 10,
    },
    company: {
        fontSize: 14,
        color: _GLOBAL_COLORS.TEXT_COLOR_4,
    },
    logoutSection: {
        height: 'auto',
        justifyContent: 'flex-end',
        paddingBottom: '10%',
        paddingTop: '5%',
        marginTop: '5%',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: '6%'

    },
    activeMenuItem: {
        backgroundColor: _GLOBAL_COLORS.LIGHT_APP_COLOR, // Light purple background for active item
        borderRadius: 150,

    },
    menuItemText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
    menuItemTextActive: {
        color:  _GLOBAL_COLORS.APP_COLOR, // Active color (similar to purple in the image)
        fontWeight: 'bold',
    },
    badge: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginLeft: 'auto', // Align badge to the right

    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    submenu: {
        paddingLeft: 40, // Indent submenu items
        marginVertical: 5, // Spacing between submenu items
    },
    submenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    submenuItemText: {
        marginLeft: 15,
        fontSize: 14,
        color: '#555',
    },
});