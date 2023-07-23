import {colaGenerator} from "./index.js";

class Password {
  #key = ["1", "2", "3", "4"];
  constructor() {
    this.pw = [document.querySelector("#pw-input-1"), document.querySelector("#pw-input-2"), document.querySelector("#pw-input-3"), document.querySelector("#pw-input-4")];
    this.list = [];
    this.dialogPw = document.querySelector("#dialog-pw");
    this.dialogManage = document.querySelector("#dialog-manage");
  }
  setPw(data) {
    if (data === "del") {
      this.list.pop();
      this.pw[this.list.length].setAttribute("src", "./img/pw.svg");
    } else if (data === "close") {
      this.resetPw();
      this.dialogPw.close();
    } else {
      this.list.push(data);
      console.log(this.list);

      this.pw[this.list.length - 1].setAttribute("src", "./img/pw-input.svg");
      if (this.list.length === 4) {
        if (JSON.stringify(this.list) === JSON.stringify(this.#key)) {
          this.dialogPw.close();
          this.resetPw();
          this.dialogManage.showModal();
          colaGenerator.manageColaDisplay();
        } else {
          this.resetPw();
        }
      }
    }
  }
  resetPw() {
    this.pw.forEach((item) => {
      item.setAttribute("src", "./img/pw.svg");
    });
    this.list = [];
  }
}
export default Password;
