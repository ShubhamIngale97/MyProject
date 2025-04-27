import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GetRenderIcons } from '../Util/GlobalFunction';
import { _SYNC_MENU } from '../Navigation/NavArray';
import Styles from '../Styles/Styles';
import { syncDownload } from '../Services/ApiHelper';

const SyncModal = ({ isSyncModelVisible, localized }) => {
    
    const [syncStatuses, setSyncStatuses] = useState(
        _SYNC_MENU.reduce((acc, item) => {
            acc[item.name] = 'loading';
            return acc;
        }, {})
    );

    useEffect(() => {
        handleDownload()
    }, [])

    const handleDownload = async () => {
        const downloadPromises = _SYNC_MENU.map((item) => {
            setSyncStatuses((prev) => ({ ...prev, [item.name]: 'loading' }));
            return new Promise((resolve) => {
                syncDownload(item.api, (flag, response) => {
                    if (flag) {
                        setSyncStatuses((prev) => ({ ...prev, [item.name]: 'downloaded' }));
                        resolve({ name: item.name, status: 'downloaded' });
                    } else {
                        setSyncStatuses((prev) => ({ ...prev, [item.name]: 'failed' }));
                        resolve({ name: item.name, status: 'failed' });
                    }
                });
            });
        });

        await Promise.all(downloadPromises);
    };

    return (
        <Modal visible={isSyncModelVisible} transparent={true}>
            <View style={[Styles.backgroundShade(), { justifyContent: 'center', alignItems: 'center' }]}>
                <View style={[Styles.modalStyle()]}>
                    <View style={[Styles.modalHeaderStyle()]}>
                        <Text style={[Styles.headingText()]}>
                            {localized('sync_modal').toUpperCase()}
                        </Text>
                    </View>
                    <ScrollView>
                        {_SYNC_MENU.map((item, index) => (
                            <View key={index + '_sync'} style={[Styles.autoSyncList()]}>
                                <View style={{ alignSelf: 'center' }}>
                                    {GetRenderIcons(item.iconType, item.icon)}
                                </View>
                                <View style={[Styles.viewItem()]}>
                                    <Text style={[Styles.BoldText()]}>{localized(item.label)}</Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    {syncStatuses[item.name] === 'loading' && <ActivityIndicator size="small" />}
                                    {syncStatuses[item.name] === 'downloaded' && GetRenderIcons('FontAwesome', 'check-circle')}
                                    {syncStatuses[item.name] === 'failed' && GetRenderIcons('FontAwesome', 'times-circle')}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default SyncModal;