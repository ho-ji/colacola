import {colaList} from "./index.js";

class ColaGenerator {
  constructor() {
    this.sellingColaList = document.querySelector(".selling-cola-list");
    this.manageColaList = document.querySelector(".manage-cola-list");
  }
  async start() {
    const response = await this.loadCola();
    this.colaDisplay(response);
  }
  /*TODO*/
  async selectedStart(items) {
    const response = await this.loadCola();
  }
  async loadCola() {
    try {
      const response = await fetch("./selling-cola.json");
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.error(error);
    }
  }
  colaDisplay(data) {
    let cnt = 0;
    data.forEach((item) => {
      if (++cnt <= 6) {
        const colaItem = document.createElement("button");
        const colaImg = document.createElement("img");
        const colaName = document.createElement("span");
        const colaPrice = document.createElement("span");

        colaItem.setAttribute("class", "selling-cola-style");

        colaImg.setAttribute("src", `./img/${item.img}`);
        colaImg.setAttribute("alt", `${item.name} 이미지`);

        colaName.setAttribute("class", "name-cola-style");
        colaName.textContent = item.name;

        colaPrice.setAttribute("class", "price-cola");
        colaPrice.textContent = `${item.price}원`;

        colaItem.append(colaImg);
        colaItem.append(colaName);
        colaItem.append(colaPrice);
        this.sellingColaList.append(colaItem);
        colaList.saveCola(item, true);
      } else {
        colaList.saveCola(item, false);
      }
    });
  }
  manageColaDisplay() {
    const list = colaList.getColaList();
    for (const name in list) {
      const item = list[name];
      const colaItem = document.createElement("li");
      colaItem.setAttribute("class", "manage-cola-item");
      colaItem.innerHTML = `<img src=/img/${item.img} alt='${item.name}의 이미지'>
      <form class="manage-cola-info">
        <p>${name}</p>
        <label>
        가격
        <input value=${item.price} name="colaPrice" type="number" min="0" pattern="[0-9]+"/>
        </label>
        <label>
        수량
        <input value=${item.count} name="colaCount" type="number" min="0" pattern="[0-9]+" class="manage-input"/>
        </label>
        <label>
        판매중
        <input ${item.isDisplay && "checked"} type="checkbox"/>
        </label>
        <button type="button" class="cola-edit">수정</button>
      </form>
      `;
      this.manageColaList.append(colaItem);
    }
  }
}

export default ColaGenerator;
