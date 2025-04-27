import { localized } from '../component/CommonUtil/CommonUtil';
import auth from '@react-native-firebase/auth';
import { ShowSuccessAlert } from '../Util/GlobalFunction';
import { useContext } from 'react';
import { GlobalContext } from '../../App';

const { setLoginStatus } = useContext(GlobalContext)


export const CreateNewUser = (userName,Password) => {
    auth()
    .createUserWithEmailAndPassword(userName,Password)
    .then(() => {
        console.log('User account created & signed in!');
        ShowSuccessAlert(
            flag => {  },
            localized('success_alert_lbl'),
            localized('login_Success_lbl')
        )
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
        console.error(error);
    });
}