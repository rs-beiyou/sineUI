class siLog{
  constructor(){
  }
  log(msg){
    console.log(msg);
  }
  info(msg){
    console.info(msg);
  }
  warn(msg){
    console.warn(msg);
  }
  error(msg){
    console.error(msg);
  }
}
const Log = new siLog();
export {Log} ;