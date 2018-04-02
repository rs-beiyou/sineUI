export default class XHR {
  constructor() {
    let xhr;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
    }
    return xhr;
  }
}