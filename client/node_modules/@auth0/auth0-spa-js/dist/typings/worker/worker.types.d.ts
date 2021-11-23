import { FetchOptions } from '../global';
/**
 * @ts-ignore
 */
export declare type WorkerRefreshTokenMessage = {
    timeout: number;
    fetchUrl: string;
    fetchOptions: FetchOptions;
    useFormData?: boolean;
    auth?: {
        audience?: string;
        scope?: string;
    };
};
