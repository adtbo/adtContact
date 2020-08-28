import config from '../../config/api.config';

const apiProtocol = config.api.protocol || 'http';
const apiBaseUrl = config.api.baseAddress && config.api.baseAddress.replace(/\/$/,'');
const apiKey = config.api.appApiKey;

let apiLang = 'id';

export const baseUrl = () => {
    return `${apiProtocol}://${apiBaseUrl}`;
};

const baseConfig = {
    baseURL: baseUrl(),
    timeout: 20000,
    headers:{
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

if(apiKey) {
    baseConfig.headers['App-ApiKey'] = apiKey
};

export const generateConfig = ({ headers, params, others }) => {
    const currentHeader = {
        ...baseConfig.headers,
        ...headers
    };

    if(apiLang){
        currentHeader['Accept-language'] = apiLang;
    };

    return ({
        ...baseConfig,
        headers: currentHeader,
        params: params ? params : {},
        ...others
    });
};

export const authorizationHeader = (token) => {
    return({
        authorization: `Bearer ${token}`
    });
};

export const pathGenerator = (path) => {
    const pathWithoutSlash = path.replace(/^\//, '');
    return `/${pathWithoutSlash}`;
};

export const setAcceptLanguage = (lang) => {
    apiLang = lang;
};

export default {
    authorizationHeader,
    baseUrl,
    generateConfig,
    pathGenerator,
    setAcceptLanguage,
};

