import ColaGenerator from "./ColaGenerator.js";
import VendingMachineEvents from "./VendingMachineEvents.js";
import ColaList from "./ColaList.js";

export const colaGenerator = new ColaGenerator();
const vendingMachineEvents = new VendingMachineEvents();
export const colaList = new ColaList();

(async function () {
  await colaGenerator.start();
  vendingMachineEvents.bindEvent();
})();
