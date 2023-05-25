type SchemeOptions = 'http' | 'https';
export type QueryParam = { key :string, value: string | number | Array<string | number>}

const HOST_REGEX: RegExp = /\/\/[\w\-\.]+(:[\d]+)?\/?/g
const PATH_PARAM_SEPARATOR_REGEX: RegExp = /(http|https):\/\/[\w\-\.^;]+(:[\d]+)?\//g

export class URLBuilder {

    private _scheme: string = "";
    private _host: string = "";
    private _port: string = "";
    private _pathParams: string = "";
    private _queryParams: string = "";

    constructor() {}

    public build(): string {
        if(this._queryParams) {
            this._queryParams = "?".concat(this._queryParams);
        }
        return this._scheme.concat(this._host, this._port, this._pathParams, this._queryParams);
    }

    public buildFrom(url: string) {
        this.parseURL(url);
        return this;
    }

    // TODO: Add try-catch blocks with errors for these methods
    private parseURL(url: string): void {
        this.extractScheme(url);
        this.extractHostAndPort(url);
        this.extractPathParams(url);
        this.extractQueryParams(url);
    }

    private extractScheme(url: string): void {
        this.scheme(url.split(':')[0] as SchemeOptions);
    }

    private extractHostAndPort(url: string): void {
        let match = url.match(HOST_REGEX);

        if(match) {
            let cleanedMatch = match[0].replaceAll('/', '');
            if(cleanedMatch.includes(':')) {
                let hostWithPort = cleanedMatch.split(':');
                this.host(hostWithPort[0]);
                this.port(Number(hostWithPort[1]));
            }
            else {
                this.host(cleanedMatch);
            }
        }
    }

    private extractPathParams(url: string) {
        let match = url.match(PATH_PARAM_SEPARATOR_REGEX);
    
        if(match) {
            let pathAndQueryParams = url.replace(match.toString(), '').split('?')[0];
            this.addPathParams(pathAndQueryParams.split('/'));
        }
    }

    private extractQueryParams(url: string) {
        let queryParams = url.split('?')[1];
        if(queryParams) {
            queryParams.split('&').map((value: string) => {let query = value.split('='); this.addQueryParam({key: query[0], value: query[1]})});
        }
    }

    public scheme(scheme: SchemeOptions) {
        this._scheme = scheme as string + '://';
        return this;
    }

    public host(host: string) {
        this._host = host;
        return this;
    }   

    public port(port: number) {
        this._port = ":".concat(port?.toString());
        return this;
    }

    public addPathParams(pathParams: Array<string>) {
        pathParams.map((param: string) => {this._pathParams = this._pathParams.concat(`/${param}`)});
        return this;
    }

    public addPathParam(pathParam: string | number) {
        if(typeof pathParam === 'number') {
            pathParam = pathParam.toString();
        }
        this._pathParams += "/".concat(pathParam);
        return this;
    }

    public addQueryParams(queryParams: Array<QueryParam>) {
        queryParams.map((param: QueryParam) => {this.addQueryParam(param)});
        return this;
    }

    public addQueryParam(queryParam: QueryParam) {
        if(queryParam.value instanceof Array) {
            queryParam.value = this.setMultipleQueryValues(queryParam.value);
        }
        this._queryParams += `${this._queryParams ? '&' : ''}${queryParam.key}=${queryParam.value}`;
        return this;
    }
    
    private setMultipleQueryValues(queryValues: Array<string | number>): string {
        return queryValues.join(',');
    }

}