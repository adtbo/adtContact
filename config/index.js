import { Platform } from 'react-native'
import {
    API_URL,
    IOS_EXAMPLE_KEY,
    ANDROID_EXAMPLE_KEY,
    WEB_EXAMPLE_KEY,
} from 'react-native-dotenv'

export default {
    API_URL,
    EXAMPLE_KEY: Platform.select({
        ios: IOS_EXAMPLE_KEY,
        android: ANDROID_EXAMPLE_KEY,
        web: WEB_EXAMPLE_KEY,
    })
};
