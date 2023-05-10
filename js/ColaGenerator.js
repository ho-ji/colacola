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
    for(let i=0; i<6; i++){
      const colaItem = document.createElement('li');
      const colaImg = document.createElement('img');
      const colaName = document.createElement('p');
      const colaPrice = document.createElement('p');
      
      colaItem.setAttribute('class','selling-cola-style');

      colaImg.setAttribute('src', `./img/${data[i].img}`);
      colaImg.setAttribute('alt',`${data[i].name} 이미지`);

      colaName.setAttribute('class', 'name-cola-style');
      colaName.textContent = data[i].name;

      colaPrice.setAttribute('class','price-cola');
      colaPrice.textContent = `${data[i].price}원`;

      colaItem.append(colaImg);
      colaItem.append(colaName);
      colaItem.append(colaPrice);

      this.sellingColaList.append(colaItem);
    }
  }
}

export default ColaGenerator;