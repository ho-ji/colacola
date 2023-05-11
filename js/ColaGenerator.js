import colaManagement from "./index.js";
class ColaGenerator {
  constructor() {
    this.sellingColaList = document.querySelector('.selling-cola-list');
  }
  async start(){
    const response = await this.loadCola();
    this.colaDisplay(response);
  }
  /*TODO*/
  async selectedStart(items){
    const response = await this.loadCola();
  }
  async loadCola(){
    try{
      const response = await fetch('./selling-cola.json');
      if(response.ok){
        return response.json();
      }
      else{
        throw new Error(response.status);
      }
    }
    catch(e){
      console.error(error);
    }
  }
  colaDisplay(data){
    let cnt = 0;
    data.forEach((item) => {
      if(++cnt<=6){
        const colaItem = document.createElement('button');
        const colaImg = document.createElement('img');
        const colaName = document.createElement('span');
        const colaPrice = document.createElement('span');
        
        colaItem.setAttribute('class','selling-cola-style');

        colaImg.setAttribute('src', `./img/${item.img}`);
        colaImg.setAttribute('alt',`${item.name} 이미지`);

        colaName.setAttribute('class', 'name-cola-style');
        colaName.textContent = item.name;

        colaPrice.setAttribute('class','price-cola');
        colaPrice.textContent = `${item.price}원`;

        colaItem.append(colaImg);
        colaItem.append(colaName);
        colaItem.append(colaPrice);
        this.sellingColaList.append(colaItem);
        colaManagement.saveCola(item, true);
      }
      else{
        colaManagement.saveCola(item, false);
      }
    });
  }
}

export default ColaGenerator;