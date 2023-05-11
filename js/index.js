import ColaGenerator from './ColaGenerator.js';
import VendingMachineEvents from './VendingMachineEvents.js';
import ColaManagement from './ColaManagement.js';

const colaGenerator = new ColaGenerator();
const vendingMachineEvents = new VendingMachineEvents();
const colaManagement = new ColaManagement();

(async function(){
  await colaGenerator.start();
  vendingMachineEvents.bindEvent();
})();

export default colaManagement;