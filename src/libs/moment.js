/**
 * @author ocobo(zhangming)
 * @description A class for Date dealing
 */
export default class Moment {
  constructor(config, fmt) {
    if(this.isMoment(config)){
      this._d = new Date(config._d != null ? config._d.getTime() : NaN)
      return this
    }
    if(typeof config === 'string'){
      this._d = new Date(config)
      return this.format(fmt)
    }
    if(Object.prototype.toString.call(config) === '[object Array]'){
      return this.init(config)
    }
    this._d = new Date()
  }
  init ([year,month,day,hour,minute,second]) {
    this._d = new Date(`${year}-${month ? month+1 : 1}-${day || 1} ${hour || 0}:${minute || 0}:${second || 0}`)
    return this
  }
  isValid () {
    return !isNaN(this._d.getTime())
  }
  isMoment (moment) {
    return moment instanceof Moment
  }
  clone () {
    return new Moment(this)
  }
  get (units) {
    return this._d[`get${units}`]()
  }
  now () {
    return Date.now ? Date.now() : +(new Date());
  }
  isLeapYear (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  daysInMonth (year, month) {
    year = year || this.year()
    month = month || this.month()
    let modMonth = ((month%12) + 12)%12;
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (this.isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
  }
  daysInYear (year) {
    year = year || this.year()
    return this.isLeapYear(year) ? 366 : 365;
  }
  startOf(units) {
    switch (units) {
      case 'year':
        this.month(0).startOf('month');
        break;
      case 'month':
        this.date(1).startOf('day');
        break;
      case 'day':
        this.hour(0).startOf('hour');
        break;
      case 'hour':
        this.minute(0).startOf('minute');
        break;
      case 'minute':
        this.second(0).startOf('second');
        break;
      case 'second':
        this.millisecond(0);
        break;
    }
    return this;
  }
  endOf(units) {
    return this.startOf(units).add(1, units).add(-1, 'ms');
  }
  year (num) {
    if (num != null) {
      this._d.setFullYear(num)
      return this;
    } else {
      return this.get('FullYear')
    }
  }
  month (num) {
    if (num != null) {
      this._d.setMonth(num)
      return this;
    } else {
      return this.get('Month')
    }
  }
  date (num) {
    if(num != null){
      this._d.setDate(num)
      return this;
    }else{
      return this.get('Date')
    }
  }
  day () {
    return this.get('Day')
  }
  hour (num) {
    if(num != null){
      this._d.setHours(num)
      return this;
    }else{
      return this.get('Hours')
    }
  }
  minute (num) {
    if(num != null){
      this._d.setMinutes(num)
      return this;
    }else{
      return this.get('Minutes')
    }
  }
  second (num) {
    if(num != null){
      this._d.setSeconds(num)
      return this;
    }else{
      return this.get('Seconds')
    }
  }
  millisecond (num) {
    if(num != null){
      this._d.setMilliseconds(num)
      return this;
    }else{
      return this.get('Milliseconds')
    }
  }
  add (num, units) {
    switch (units) {
      case 'year':
        this._d = new Date(this._d.setFullYear(this._d.getFullYear()+num))
      case 'month':
        this._d = new Date(this._d.setMonth(this._d.getMonth()+num))
        break;
      case 'day':
        this._d = new Date(this._d.setDate(this._d.getDate()+num))
        break;
      case 'hour':
        this._d = new Date(this._d.setHours(this._d.getHours()+num))
        break;
      case 'm':
        this._d = new Date(this._d.setMinutes(this._d.getMinutes()+num))
        break;
      case 's':
        this._d = new Date(this._d.setSeconds(this._d.getSeconds()+num))
        break;
      case 'ms':
        this._d = new Date(this._d.setTime(this._d.getTime()+num))
        break;
    }
    return this;
  }
  subtract (num, units) {
    return this.add(-num, units)
  }
  format(fmt) {
    let str = fmt;   
    let Week = ['日','一','二','三','四','五','六'];  
    let da = this._d;
    str=str.replace(/yyyy|YYYY/,da.getFullYear());   
    str=str.replace(/yy|YY/,(da.getYear() % 100)>9?(da.getYear() % 100).toString():'0' + (da.getYear() % 100));   
  
    let m = da.getMonth()+1

    str=str.replace(/MM/,m>9?m.toString():'0' + m);   
    str=str.replace(/M/g,m);
  
    str=str.replace(/w|W/g,Week[da.getDay()]);   
  
    str=str.replace(/dd|DD/,da.getDate()>9?da.getDate().toString():'0' + da.getDate());   
    str=str.replace(/d|D/g,da.getDate());   
  
    str=str.replace(/hh|HH/,da.getHours()>9?da.getHours().toString():'0' + da.getHours());   
    str=str.replace(/h|H/g,da.getHours());   
    str=str.replace(/mm/,da.getMinutes()>9?da.getMinutes().toString():'0' + da.getMinutes());   
    str=str.replace(/m/g,da.getMinutes());   
  
    str=str.replace(/ss|SS/,da.getSeconds()>9?da.getSeconds().toString():'0' + da.getSeconds());   
    str=str.replace(/s|S/g,da.getSeconds());
    return str;
  }
  valueOf () {
    return this._d.valueOf()
  }
  isBefore(moment, units) {
    if(moment instanceof Moment) {
      units = units || 'ms'
      if(units === 'ms'){
        return this.valueOf() < moment._d.valueOf()
      }else{
        return this.clone().endOf(units).valueOf() < moment._d.valueOf()
      }
    }
  }
  isAfter(moment, units) {
    if(moment instanceof Moment) {
      units = units || 'ms'
      if(units === 'ms'){
        return this.valueOf() > moment._d.valueOf()
      }else{
        return this.clone().startOf(units).valueOf() > moment._d.valueOf()
      }
    }
  }
  isSame (moment, units) {
    if(moment instanceof Moment) {
      units = units || 'ms'
      if(units === 'ms'){
        return this.valueOf() === moment._d.valueOf()
      }else{
        let inputMs = moment._d.valueOf()
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs >= this.clone().endOf(units).valueOf()
      }
    }
  }
}