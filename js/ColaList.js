class ColaList {
  constructor() {
    this.colaList = {};
  }
  saveCola({img, name, price, count}, isDisplay) {
    this.colaList[name] = {
      img: img,
      price: price,
      count: count,
      isDisplay: isDisplay,
    };
  }
  getColaCount(name) {
    return this.colaList[name]["count"];
  }
  setColaCount(name, num) {
    return (this.colaList[name]["count"] += num);
  }
  getPrice(name) {
    return this.colaList[name]["price"];
  }
  getColaList() {
    return this.colaList;
  }
}

export default ColaList;
