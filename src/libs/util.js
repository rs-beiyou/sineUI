const util = {

};
util.use = (obj,array)=>{
  for(let i=0,len = array.length;i<len;i++){
    const arr = array[i];
    const old = obj[arr.name];
    obj[arr.name] = arr.plugin;
    obj[arr.name].Constructor = arr.constructor;
    obj[arr.name].noConflict = function () {
      obj[arr.name] = old;
      return this;
    }
  }
}

export default util;
