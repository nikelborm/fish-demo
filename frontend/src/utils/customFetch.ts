import { API_PATH } from 'constant';

// eslint-disable-next-line import/no-cycle
import { authStore } from './authStore';
import { validate } from './validate';

export function customFetch<TRequest>(
  target: RequestInfo,
  customFetchOptions: CustomFetchOptions<TRequest, 'notParse'>,
): Promise<Response>;

export function customFetch<TRequest>(
  target: RequestInfo,
  customFetchOptions: CustomFetchOptions<TRequest, 'parseJsonBody'>,
): Promise<Record<string, any>>;

export function customFetch<TRequest, TResponse>(
  target: RequestInfo,
  customFetchOptions: CustomFetchOptions<
    TRequest,
    'parseJsonBodyAndValidateWithSchemaDTO',
    TResponse
  >,
): Promise<TResponse>;

export async function customFetch<TRequest, TResponse>(
  target: RequestInfo,
  {
    method,
    headers,
    body,
    params,
    needsAccessToken = true,
    needsJsonResponseBodyParsing,
    requestDTOclass,
    responseDTOclass,
    baseUrl = API_PATH, // Project-specific
  }: CustomFetchOptionsBase<TRequest> & {
    needsJsonResponseBodyParsing: boolean;
    responseDTOclass?: new () => TResponse;
  },
): Promise<Response | Record<string, any> | TResponse> {
  const nextHeaders: HeadersInit = { ...headers };

  const options: RequestInit = {};

  if (method && method !== 'GET') {
    options.method = method;
    if (method !== 'DELETE') {
      nextHeaders['Content-Type'] = 'application/json';
    }
  }

  if (body) {
    if (requestDTOclass) {
      const { errors, payloadInstance } = validate(body, requestDTOclass);
      if (errors.length)
        throw new Error(
          `Validation error: request body schema does not match DTO schema: ${JSON.stringify(
            [payloadInstance, errors, requestDTOclass],
          )}`,
        );
    }
    options.body = JSON.stringify(body);
  }

  if (needsAccessToken) {
    nextHeaders.authorization = await authStore.getAuthHeader();
  }

  options.headers = new Headers(nextHeaders);

  const urlToFetch = new URL(`${baseUrl}${target}`);
  const urlParamsAdditional = new URLSearchParams(
    JSON.parse(JSON.stringify(params ?? {})), // JSON to remove undefined values
  );

  const urlParamsAdditionalStringified = urlParamsAdditional.toString();

  if (urlParamsAdditionalStringified) {
    urlToFetch.search = urlToFetch.search
      ? `${urlToFetch.search}&${urlParamsAdditionalStringified}`
      : urlParamsAdditionalStringified;
  }

  let getParsedResponse: (
    res: Response,
  ) => Promise<Response | Record<string, any> | TResponse>;

  if (needsJsonResponseBodyParsing) {
    if (responseDTOclass) {
      getParsedResponse = getResponseParsingFn(true, responseDTOclass);
    } else {
      getParsedResponse = getResponseParsingFn(true);
    }
  } else getParsedResponse = getResponseParsingFn(false);

  const responseData = await fetch(urlToFetch.href, options).then(
    getParsedResponse,
  );

  return responseData;
}

function getResponseParsingFn(
  needsJsonResponseBodyParsing: false,
): (res: Response) => Promise<Response>;

function getResponseParsingFn(
  needsJsonResponseBodyParsing: true,
): (res: Response) => Promise<Record<string, any>>;

function getResponseParsingFn<TResponse>(
  needsJsonResponseBodyParsing: true,
  validationModelDTO: new () => TResponse,
): (res: Response) => Promise<TResponse>;

function getResponseParsingFn<TResponse>(
  needsJsonResponseBodyParsing: boolean,
  validationModelDTO?: new () => TResponse,
): (res: Response) => Promise<Response | Record<string, any> | TResponse> {
  if (!needsJsonResponseBodyParsing)
    return async (
      res: Response,
    ): Promise<
      [TResponse] extends [undefined] ? Record<string, any> : TResponse
    > => {
      const parsed = await res.json();

      if (!res.ok) throw parsed ?? res.statusText;

      if (!validationModelDTO) return parsed;

      const { errors, payloadInstance } = validate(parsed, validationModelDTO);
      if (errors.length)
        throw new Error(
          `Validation error: response body schema does not match DTO schema: ${JSON.stringify(
            [payloadInstance, errors, validationModelDTO],
          )}`,
        );
      return payloadInstance;
    };
}

type CustomFetchOptionsBase<TRequest> = {
  method?: string;
  headers?: object;
  body?: TRequest;
  params?: Record<string, string | number | boolean>;
  needsAccessToken?: boolean;
  baseUrl?: string;
  requestDTOclass?: new () => TRequest;
};

type CustomFetchOptions<
  TRequest,
  ResponseBodyParsingMode extends
    | 'notParse'
    | 'parseJsonBody'
    | 'parseJsonBodyAndValidateWithSchemaDTO',
  TResponse = Record<string, any>,
> = [ResponseBodyParsingMode] extends ['notParse']
  ? CustomFetchOptionsBase<TRequest> & {
      needsJsonResponseBodyParsing: false;
      needsValidatingOfJsonBodyByDTO: false;
    }
  : [ResponseBodyParsingMode] extends ['parseJsonBody']
  ? CustomFetchOptionsBase<TRequest> & {
      needsJsonResponseBodyParsing: true;
      needsValidatingOfJsonBodyByDTO: false;
    }
  : [ResponseBodyParsingMode] extends ['parseJsonBodyAndValidateWithSchemaDTO']
  ? CustomFetchOptionsBase<TRequest> & {
      needsJsonResponseBodyParsing: true;
      needsValidatingOfJsonBodyByDTO: true;
      responseDTOclass: new () => TResponse;
    }
  : never;
