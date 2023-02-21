import axios, { AxiosRequestConfig } from "axios";

interface IRestResponse {
    status: number;
    data: object | string; // json | html
    error?: boolean;
    text?: string;
}
export default async (option: AxiosRequestConfig): Promise<IRestResponse> => {
    return await axios(option)
        .then((res) => {
            return {
                status: res.status,
                data: res.data,
            };
        })
        .catch((err) => {
            if (!err?.response) {
                return {
                    error: true,
                    status: 0,
                    data: err.cause,
                    text: err.message,
                };
            }
            return {
                error: true,
                status: err.response.status,
                data: err.response.data,
                text: err.response.statusText,
            };
        });
};
