import { initializeExplore } from './modules/explore/initialize.ts';
import { initializeCheckout } from './modules/checkout/initialize.ts';
import { initializeDecide } from './modules/decide/initialize.ts';

export function initializeModules() {
    initializeExplore();
    initializeCheckout();
    initializeDecide();
}
