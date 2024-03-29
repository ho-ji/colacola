import {colaList} from "./index.js";
import Password from "./Password.js";
class VendingMachineEvents {
  constructor() {
    const vm = document.querySelector(".vending-machine-container");
    this.balance = vm.querySelector("#balance");
    this.btnBalance = vm.querySelector("#btn-return-balance");
    this.inputMoney = vm.querySelector("#input-money");
    this.btnInputMoney = vm.querySelector("#btn-input-money");
    this.purchasedColaList = vm.querySelector("#purchased-cola-list");
    this.btnPossession = vm.querySelector("#btn-possession");

    const pc = document.querySelector(".possession-container");
    this.possessionMoney = pc.querySelector("#possession-money");
    this.possessionColaList = pc.querySelector("#possession-cola-list");
    this.purchasedMoney = pc.querySelector("#purchased-money");

    this.password = new Password();
    const mc = document.querySelector(".manage-container");
    this.btnManage = mc.querySelector("#btn-manage");
    this.dialogPw = mc.querySelector("#dialog-pw");
    this.dialogManage = mc.querySelector("#dialog-manage");
    this.btnDialogClose = mc.querySelector(".btn-close");
    this.btnPw = mc.querySelectorAll(".pw");

    this.btnAudio = new Audio("../sound/btn.mp3");
    this.dropAudio = new Audio("../sound/drop-can.mp3");
    this.getAudio = new Audio("../sound/get.mp3");
  }
  /*인자로 받은 리스트에 콜라 추가*/
  addList(img, name, cnt, list) {
    const target = list.querySelectorAll("li");
    let isSelected = false;
    target.forEach((item) => {
      if (item.querySelector(".name-cola-style").textContent == name) {
        item.querySelector(".count-cola").textContent = parseInt(item.querySelector(".count-cola").textContent) + parseInt(cnt);
        isSelected = true;
      }
    });
    if (!isSelected) {
      const colaItem = document.createElement("li");
      const colaImg = document.createElement("img");
      const colaName = document.createElement("p");
      const colaCnt = document.createElement("p");
      const cntText = document.createElement("span");

      colaItem.setAttribute("class", "cola-list-style");

      colaImg.setAttribute("src", img);
      colaImg.setAttribute("alt", `${name} 이미지`);
      colaName.setAttribute("class", "name-cola-style");
      colaName.textContent = name;
      colaCnt.textContent = parseInt(cnt);
      colaCnt.setAttribute("class", "count-cola");
      cntText.textContent = "개";
      cntText.setAttribute("class", "a11y-hidden");

      colaCnt.append(cntText);

      colaItem.append(colaImg);
      colaItem.append(colaName);
      colaItem.append(colaCnt);

      list.append(colaItem);
    }
  }
  /*품절표시*/
  setSoldOut(item) {
    const soldOutBox = document.createElement("div");
    const soldOutText = document.createElement("p");
    soldOutBox.setAttribute("class", "sold-out");
    soldOutText.setAttribute("class", "sold-out-text");
    soldOutText.textContent = "품절";
    soldOutBox.append(soldOutText);
    item.append(soldOutBox);
    item.disabled = true;
  }
  bindEvent() {
    this.colaList = document.querySelectorAll(".selling-cola-list button");
    /*자판기에서 콜라선택 시*/
    this.colaList.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.btnAudio.play();
        const colaImg = item.querySelector("img").getAttribute("src");
        const colaName = item.querySelector(".name-cola-style").textContent;
        const colaPrice = parseInt(item.querySelector(".price-cola").textContent);
        if (parseInt(this.balance.dataset.money) >= colaPrice) {
          if (colaList.getColaCount(colaName) > 0) {
            this.addList(colaImg, colaName, 1, this.purchasedColaList);
            this.dropAudio.play();
            this.balance.dataset.money = parseInt(this.balance.dataset.money) - colaPrice;
            this.balance.textContent = this.balance.dataset.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const cnt = colaList.setColaCount(colaName, -1);
            if (cnt === 0) {
              this.setSoldOut(item);
            }
          }
        } else {
          alert("돈을 더 넣어주세요!");
        }
      });
    });
    /*거스롬돈 반환 버튼선택 시*/
    this.btnBalance.addEventListener("click", (e) => {
      if (parseInt(this.possessionMoney.dataset.money) > 0) {
        this.btnAudio.play();
        const money = parseInt(this.possessionMoney.dataset.money) + parseInt(this.balance.dataset.money);
        this.possessionMoney.textContent = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.possessionMoney.dataset.money = money;
        this.balance.dataset.money = 0;
        this.balance.textContent = "0";
      }
    });
    /*입금 버튼선택 시*/
    this.btnInputMoney.addEventListener("click", (e) => {
      if (this.inputMoney.value && this.inputMoney.validity.valid) {
        const money = parseInt(this.possessionMoney.dataset.money) - parseInt(this.inputMoney.value);
        if (money >= 0) {
          this.btnAudio.play();
          this.possessionMoney.dataset.money = money;
          this.possessionMoney.textContent = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          this.balance.dataset.money = parseInt(this.balance.dataset.money) + parseInt(this.inputMoney.value);
          this.balance.textContent = this.balance.dataset.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          console.log(this.possessionMoney);
          alert("소지금이 부족합니다");
        }
      } else {
        alert("숫자를 입력하세요");
      }
      this.inputMoney.value = "";
    });
    /*획득 버튼선택 시*/
    this.btnPossession.addEventListener("click", (e) => {
      const list = this.purchasedColaList.querySelectorAll("li");
      let total = 0;
      list.forEach((item) => {
        this.getAudio.play();
        const img = item.querySelector("img").getAttribute("src");
        const name = item.querySelector(".name-cola-style").textContent;
        const cnt = item.querySelector(".count-cola").textContent;
        this.addList(img, name, cnt, this.possessionColaList);
        total += colaList.getPrice(name);
      });
      this.purchasedColaList.innerHTML = "";
      this.purchasedMoney.dataset.money = parseInt(this.purchasedMoney.dataset.money) + total;
      this.purchasedMoney.textContent = this.purchasedMoney.dataset.money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    /*관리자모드 버튼 선택 시*/
    this.btnManage.addEventListener("click", (e) => {
      this.dialogPw.showModal();
    });
    /*pw모달 영역외 선택 시*/
    this.dialogPw.addEventListener("click", (e) => {
      if (e.target === this.dialogPw) {
        this.dialogPw.close();
      }
    });
    /*pw 선택 시 */
    this.btnPw.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.password.setPw(item.dataset.number);
      });
    });
  }
}

export default VendingMachineEvents;
