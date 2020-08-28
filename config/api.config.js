import {
    BASE_ADDRESS,
    PROTOCOL,
    APP_API_KEY,
    NODE_ENV
} from 'react-native-dotenv';

const configs = {
    api: {
        baseAddress: BASE_ADDRESS,
        protocol: PROTOCOL,
        appApiKey: APP_API_KEY
    },
    env: NODE_ENV
};

//workaround for undefined env variables
configs.api = Object.keys(configs.api).reduce((acc, key) => {
    const item = configs.api[key];
    acc[key] = item === 'null' ? '' : item;
    return acc;
}, {});

export default configs;