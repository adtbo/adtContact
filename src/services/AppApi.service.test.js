
import 'react-native'; // required by FormData
import * as AppApi from './AppApi.service';

describe('App API', () => {


    describe('generateConfig', () => {
        test('should preserve customs header, param, other configs', () => {
            const headers = { dumb: 'token' };
            const params = { param1: 'dumb param 1', param2: 'dumb param 2' };
            const others = { onUploadProgress: jest.fn() };
            const result = AppApi.generateConfig({ headers, params, others });
            Object.keys(headers).map(key => expect(headers[key]).toBe(result.headers[key]));
            Object.keys(params).map(key => expect(params[key]).toBe(result.params[key]));
            Object.keys(others).map(key => expect(others[key]).toBe(result[key]));
        });
    });

    describe('pathGenerator', () => {
        test('should return path with only one start slash', () => {
            const path = 'dumbPath';
            const pathWithSlash = `/${path}`;
            expect(AppApi.pathGenerator(path)).toBe(pathWithSlash);
            expect(AppApi.pathGenerator(pathWithSlash)).toBe(pathWithSlash);
        });
    });


});
