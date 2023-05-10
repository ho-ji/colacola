import ColaGenerator from './ColaGenerator.js';
import VendingMachineEvents from './VendingMachineEvents.js';

const colaGenerator = new ColaGenerator();
const vendingMachineEvents = new VendingMachineEvents();

(async function(){
  await colaGenerator.start();
  vendingMachineEvents.bindEvent();
})();