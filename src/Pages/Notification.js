import React from 'react';
import HeaderComponent from '../component/HeaderComponent';
import { _HEADER_TYPE } from '../Util/GlobalConstant';
import { localized } from '../component/CommonUtil/CommonUtil';

function Notification(props) {
    return (
        <HeaderComponent
            type={_HEADER_TYPE.HOME}
            pagename={localized('notification_lbl')}
        />
    );
}

export default Notification;