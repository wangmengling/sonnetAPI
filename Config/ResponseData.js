class ResponseData {
    constructor(code, msg, data, httpCode) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.httpCode = httpCode;
      }
}

export default ResponseData();