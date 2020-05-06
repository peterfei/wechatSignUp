import request from './request.js';
import {baseUrl} from '../global.js';

class register {
  constructor() {
    this._baseUrl = baseUrl;
    this._request = new request();
    this._request.setErrorHandler(this.errorHander);
  }

  errorHander(res) {
    console.error(res);
  }

  login(obj) {
    return this._request
      .postRequest(this._baseUrl + 'api/login', obj)
      .then(res => res.data);
  }


}
export default register;
