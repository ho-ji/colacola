class VendingMachineEvents{
  constructor(){
    const vm = document.querySelector('.vending-machine-container');
    this.balance = vm.querySelector('#balance');
    this.btnBalance = vm.querySelector('#btn-return-balance');
    this.inputMoney = vm.querySelector('#input-money');
    this.btnInputMoney = vm.querySelector('#btn-input-money');
    this.purchasedColaList = vm.querySelector('#purchased-cola-list');
    this.btnPossession = vm.querySelector('#btn-possession');
    
    const pc = document.querySelector('.possession-container');
    this.possessionMoney = pc.querySelector('#possession-money');
    this.possessionColaList = pc.querySelector('#possession-cola-list');
    this.purchasedMoney = pc.querySelector('#purchased-money');
  }
  addList(img, name, cnt, list){
    const target = list.querySelectorAll('li');
    let isSelected = false;
    target.forEach(item => {
      if(item.children[1].textContent == name){
        item.children[2].textContent = parseInt(item.children[2].textContent) + parseInt(cnt);
        isSelected = true;
      }
    })
    if(!isSelected){
      const colaItem = document.createElement('li');
      const colaImg = document.createElement('img');
      const colaName = document.createElement('p');
      const colaCnt = document.createElement('div');

      colaItem.setAttribute('class','cola-list-style');
      
      colaImg.setAttribute('src', img);
      colaImg.setAttribute('alt',`${name} 이미지`);
      colaName.setAttribute('class','name-cola-style');
      colaName.textContent = name;
      colaCnt.textContent = cnt;

      colaItem.append(colaImg);
      colaItem.append(colaName);
      colaItem.append(colaCnt);

      list.append(colaItem);
    }
  }
  bindEvent(){
    this.colaList = document.querySelectorAll('.selling-cola-list li');
    /*자판기에서 콜라선택 시*/
    this.colaList.forEach(item => {
      item.addEventListener('click', e => {
        const colaImg = item.children[0].getAttribute('src');
        const colaName = item.children[1].textContent;
        const colaPrice = parseInt(item.children[2].textContent);
        if(parseInt(this.balance.dataset.money) >= colaPrice){
          this.addList(colaImg, colaName, 1, this.purchasedColaList); 
          this.balance.dataset.money = parseInt(this.balance.dataset.money) - colaPrice;
          this.balance.textContent = this.balance.dataset.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        else{
          alert('돈을 더 넣어주세요!');
        }
      })
    })
    /*거스롬돈 반환 버튼선택 시*/
    this.btnBalance.addEventListener('click', e => {
      const money = parseInt(this.possessionMoney.dataset.money) + parseInt(this.balance.dataset.money);
      this.possessionMoney.textContent = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.possessionMoney.dataset.money = money;
      this.balance.dataset.money = 0;
      this.balance.textContent = "0";
    })
    /*입금 버튼선택 시*/
    this.btnInputMoney.addEventListener('click', e => {
      if(this.inputMoney.value && this.inputMoney.validity.valid){
        const money = parseInt(this.possessionMoney.dataset.money) - parseInt(this.inputMoney.value);
        if(money >= 0){
          this.possessionMoney.dataset.money = money
          this.possessionMoney.textContent = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

          this.balance.dataset.money = parseInt(this.balance.dataset.money) + parseInt(this.inputMoney.value);
          this.balance.textContent = this.balance.dataset.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        else{
          console.log(this.possessionMoney);
          alert("소지금이 부족합니다");
        }
      }
      else{
        alert("숫자를 입력하세요");
      }
      this.inputMoney.value ="";
    })
    /*획득 버튼선택 시*/
    this.btnPossession.addEventListener('click', e => {
      const list = this.purchasedColaList.querySelectorAll('li');
      list.forEach(item => {
        const img = item.children[0].getAttribute('src')
        const name = item.children[1].textContent;
        const cnt = item.children[2].textContent;
        this.addList(img, name, cnt, this.possessionColaList);
      });
      this.purchasedColaList.innerHTML = "";
    })
  }
}

export default VendingMachineEvents;
