const util = {

};
util.use = (obj,array)=>{
  let newObj = new obj();
  let newObjProto = newObj.constructor.prototype;
  for(let i=0,len = array.length;i<len;i++){
    const arr = array[i];
    const old = newObj[arr.name];
    newObjProto[arr.name] = arr.plugin;
    newObjProto[arr.name].prototype.constructor = arr.constructor;
    newObj[arr.name].noConflict = function () {
      newObj[arr.name] = old;
      return this;
    }
  }
}

export default util;
