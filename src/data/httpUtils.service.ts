import Axios from 'axios';
const https = require('https');

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
export class HttpUtil {
    public static axis_instance: any;

    public static getAxiosInstance() {
        if (!HttpUtil.axis_instance) {
            HttpUtil.axis_instance = Axios.create({
                timeout: 300000,
                httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
            });
        }
        return HttpUtil.axis_instance;
    }

    public static async request(config: any) {
        let updatedConfig = {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            transformRequest: config.transformRequest,
            transformResponse: config.transformResponse,
            headers: config.headers,
            params: config.params,
            paramsSerializer: config.paramsSerializer,
            data: config.data,
            withCredentials: config.withCredentials,
            adapter: config.adapter,
            auth: config.auth,
            responseType: config.responseType,
            xsrfCookieName: config.xsrfCookieName,
            xsrfHeaderName: config.xsrfHeaderName,
            onUploadProgress: config.onUploadProgress,
            onDownloadProgress: config.onDownloadProgress,
            maxContentLength: config.maxContentLength,
            validateStatus: config.validateStatus,
            maxRedirects: config.maxRedirects,
            socketPath: config.socketPath,
            httpAgent: config.httpAgent,
            httpsAgent: config.httpsAgent,
            proxy: config.proxy,
            cancelToken: config.cancelToken,
        };

        let http_status_code = 200;
        let response = undefined;
        let http_error_msg = 'NA';

        try {
            console.log(
                `Rest API end point - ${updatedConfig.url}`,
            );
            response = await HttpUtil.getAxiosInstance().request(updatedConfig);
            http_status_code = response.data.http_status_code
                ? response.data.http_status_code
                : response.status;
        } catch (e) {
            console.log(`Exception Rest API end point ${config.url}`, e);
            http_status_code = 500;
            http_error_msg = 'Internal Error';
        } finally {
            response = Object.assign({
                http_status_code: http_status_code,
                http_error_msg: http_error_msg,
                data: response.data,
            });
            return response.data
        }
    }

    public static get(url: string, header?: any, paramsVal?: any) {
        let config = {
            url: url,
            method: 'get', // default
            params: paramsVal,
            headers: header,
        };
        return HttpUtil.request(config);
    }

    public static post(url: string, payload?: any, header?: any) {
        let config = {
            url: url,
            method: 'post', // default
            headers: header,
            data: payload,
        };
        return HttpUtil.request(config);
    }

    public static put(url: string, payload?: any, header?: any) {
        let config = {
            url: url,
            method: 'put', // default
            headers: header,
            data: payload,
        };
        return HttpUtil.request(config);
    }

    public static delete(url: string, payload?: any, header?: any) {
        let config = {
            url: url,
            method: 'delete', // default
            headers: header,
            data: payload,
        };
        return HttpUtil.request(config);
    }
}
