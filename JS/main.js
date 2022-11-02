import {Article} from "./modules/article.mjs";
import {novaFactura, canvisTotal, calcularTotal, Factura} from "./modules/factura.mjs";

window.onload = inici;

function inici() {
    dropdown();
    loadAfegir();
    novaFactura();
    laodRecuperar();
}


var google_pixel_7 = new Article("101", "Google Pixel 7", 0, 649);
var google_pixel_7_pro = new Article("102", "Google Pixel 7 Pro", 0, 899);
var samsung_galaxy_s22 = new Article("201", "Samsung Galaxy S22", 0, 859);
var samsung_galaxy_s22_ultra = new Article("203", "Samsung Galaxy S22 Ultra", 0, 1259);
var iphone_14 = new Article("301", "iPhone 14", 0, 1009);
var iphone_14_pro = new Article("302", "iPhone 14 Pro", 0, 1319);
var xiaomi_12 = new Article("401", "Xiaomi 12", 0, 799);
var xiaomi_12_pro = new Article("402", "Xiaomi 12 Pro", 0, 1099);
var oneplus_10 = new Article("501", "Oneplus 10", 0, 909);
var nothing_phone_1 = new Article("601", "Nothing Phone 1", 0, 469);

//Carrega els valors del dropdown
function dropdown() {
    var mobils = [iphone_14.getNom(), iphone_14_pro.getNom(), samsung_galaxy_s22.getNom(),
    samsung_galaxy_s22_ultra.getNom(), google_pixel_7.getNom(), google_pixel_7_pro.getNom(),
    xiaomi_12.getNom(), xiaomi_12_pro.getNom(), oneplus_10.getNom(), nothing_phone_1.getNom()];

    var select = document.getElementsByTagName("select")[0];
    mobils = mobils.sort();
    for (let i = 0; i < mobils.length; i++) {
        var fam = new Option(mobils[i], mobils[i]);
        select.appendChild(fam);
    }
}

/**
 * Afegeix articles a la factura,
 * si l'article ja hi és, es sumarà 1 a la quantitat
 */
function afegirArticle() {
    var mobils = [
        google_pixel_7,
        google_pixel_7_pro,
        samsung_galaxy_s22,
        samsung_galaxy_s22_ultra,
        iphone_14,
        iphone_14_pro,
        xiaomi_12,
        xiaomi_12_pro,
        oneplus_10,
        nothing_phone_1
    ];

    var taula = document.getElementsByTagName("table")[0];
    var n_files = taula.rows.length;
    var n_columnes = taula.rows[0].cells.length;
    var select = document.getElementsByTagName("select")[0].value;

    //Mirem i agafem l'objecte de mobil que coincideixi amb el que hi ha al dropdown
    for (let i = 0; i < mobils.length; i++) {
        if (select == mobils[i].getNom()) {
            var mobil_seleccionat = mobils[i];
            break;
        }
    }

    var repetit = false;
    var x = 0;
    for (var i = 0; i < n_files; i++) {
        let codi_taula = document.getElementsByTagName("table")[0].rows[i].cells[0].innerHTML;
        if (mobil_seleccionat.getCodi() == codi_taula) {
            repetit = true;
            x = i;
        }
    }
    if (repetit) {
        document.getElementsByClassName("quantitat")[x - 1].value = parseInt(document.getElementsByClassName("quantitat")[x - 1].value) + 1;
        calcularTotal();
        canvisTotal();
    } else {
        var fila = taula.insertRow(n_files);
        crearColumnes(n_columnes, fila, mobil_seleccionat.getCodi(), mobil_seleccionat.getNom(), 0, mobil_seleccionat.getPreu(), 0);
    }
}

//Afegeix onclick a afegirArticle
function loadAfegir() {
    var botoAfegir = document.getElementsByTagName("button")[0];
    botoAfegir.onclick = afegirArticle;
}

/**
 * Crea les columnes d'una nova fila amb els valors passats
 * 
 * @param {number} n_columnes 
 * @param {HTMLTableRowElement} fila 
 * @param {string} codi 
 * @param {string} nom 
 * @param {number} quantitat 
 * @param {number} preu 
 * @param {number} total 
 */
function crearColumnes(n_columnes, fila, codi, nom, quantitat, preu, total) {
    for (let i = 0; i < n_columnes; i++) {
        let columna = document.createElement("td");
        columna = fila.insertCell(i);

        switch (i) {
            case 0:
                columna.setAttribute("class", "codi");
                columna.innerHTML = codi;
                break;

            case 1:
                columna.setAttribute("class", "nom");
                columna.innerHTML = nom;
                break;

            case 2:
                let input = document.createElement("input");
                input.setAttribute("type", "number");
                input.setAttribute("value", quantitat);
                input.setAttribute("class", "quantitat");
                input.addEventListener("change", calcularTotal);
                input.addEventListener("change", canvisTotal);
                columna.appendChild(input);
                break;

            case 3:
                columna.setAttribute("class", "preu");
                columna.innerHTML = preu;
                break;

            case 4:
                columna.setAttribute("class", "total");
                columna.innerHTML = total;
                break;

            default:
                break;
        }
    }
}

//Carrega una factura guardada al LocalStorage
function recuperarFactura(){
    var codi = document.getElementsByTagName("input")[document.getElementsByTagName("input").length -1].value;
    if (codi.includes("/")) {
        var codi_separat = codi.split("/");
        var factura_a_recuperar = localStorage.getItem(codi_separat[1].toString());
        if (codi_separat[0] == 2022 && factura_a_recuperar != null && codi_separat.length == 2) {
            var factura_recuperada = new Factura(JSON.parse(factura_a_recuperar).codi_factura, JSON.parse(factura_a_recuperar).codis,
            JSON.parse(factura_a_recuperar).noms, JSON.parse(factura_a_recuperar).quantitats, JSON.parse(factura_a_recuperar).preus,
            JSON.parse(factura_a_recuperar).totals, JSON.parse(factura_a_recuperar).base_imposable, JSON.parse(factura_a_recuperar).iva,
            JSON.parse(factura_a_recuperar).import_factura);
            
            document.getElementsByTagName("p")[0].innerHTML = "2022/" + factura_recuperada.getCodiFactura();

            var taula = document.getElementsByTagName("table")[0];
            taula.innerHTML = "<tr><th>Codi</th><th>Nom</th><th>Quantitat</th><th>Preu</th><th>Total</th></tr>";
            var n_columnes = taula.rows[0].cells.length;
            for (let x = 0; x < factura_recuperada.getCodis().length; x++) {
                var n_files = taula.rows.length;
                var fila = taula.insertRow(n_files);
                crearColumnes(n_columnes, fila, factura_recuperada.getCodis()[x], factura_recuperada.getNoms()[x], 
                factura_recuperada.getQuantitats()[x], factura_recuperada.getPreus()[x], factura_recuperada.getTotals()[x]);   
            }

            document.getElementsByTagName("p")[1].innerHTML = factura_recuperada.getBaseImposable();
            document.getElementsByTagName("p")[2].innerHTML = factura_recuperada.getIva();
            document.getElementsByTagName("p")[3].innerHTML = factura_recuperada.getImportFactura();
        }
    }
    
}

//Afegeix onclick a recuperarFactura
function laodRecuperar() {
    var botoRecuperar = document.getElementsByTagName("button")[1];
    botoRecuperar.onclick = recuperarFactura;
}