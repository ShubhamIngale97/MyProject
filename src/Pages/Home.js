import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HeaderComponent from '../component/HeaderComponent';
import { _HEADER_TYPE, _ICON_TYPE } from '../Util/GlobalConstant';
import { localized } from '../component/CommonUtil/CommonUtil';
import { _SYNC_MENU } from '../Navigation/NavArray';
import SyncModal from '../component/Auto_Sync';

function Home(props) {

    const [isSyncModelVisible, setIsSyncModelVisible] = useState(false);

    useEffect(() => {
        setIsSyncModelVisible(true)
    }, [isSyncModelVisible])

    return (
        <View>
            <HeaderComponent
                type={_HEADER_TYPE.HOME}
                pagename={localized('home_lbl')}
            />
            <View style={{
                flex: 1
            }}>
                <SyncModal isSyncModelVisible={isSyncModelVisible} localized={localized} />
            </View>
        </View>
    );
}

export default Home;