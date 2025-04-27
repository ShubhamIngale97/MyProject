import moment from "moment";
import { _DRAWER_ARRAY, _TAB_ARRAY } from "../Navigation/NavArray";
import { APP_SETUP, ASYNC_KEYS } from "./Constants";
import { setDrawerNavMenu, setTabNavMenu, setUserDetails } from "./Details";
import { _storeData } from "./GlobalFunction";

export function setInitialSetUp(
    login,
    callback
) {
    const _APP_SETUP = {
        [APP_SETUP.USER_DETAILS]: login,
        [APP_SETUP.TAB_NAV_MENU]: _TAB_ARRAY,
        [APP_SETUP.DRAWER_NAV_MENU]: _DRAWER_ARRAY,
    };
    _storeData(ASYNC_KEYS.LAST_LOGIN_DATE,"fvn")
    _storeData(ASYNC_KEYS.IS_LOGGED_IN,"True")
    _storeData(ASYNC_KEYS.APP_SETUP, JSON.stringify(_APP_SETUP), () => {
        setUserDetails(login)
        setTabNavMenu(_TAB_ARRAY);
        setDrawerNavMenu(_DRAWER_ARRAY);
        callback(true)
    })
}