import { TokenEndpointOptions, TokenEndpointResponse } from './global';
export declare function oauthToken({ baseUrl, timeout, audience, scope, auth0Client, useFormData, ...options }: TokenEndpointOptions, worker?: Worker): Promise<TokenEndpointResponse>;
