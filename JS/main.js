import {dropdown, loadAfegir} from "./modules/article.mjs";
import {novaFactura, laodRecuperar} from "./modules/factura.mjs";

window.onload = inici;

function inici() {
    dropdown();
    loadAfegir();
    novaFactura();
    laodRecuperar();
}