import { crearColumnes } from "./article.mjs";

class Factura{
    constructor(codi_factura, codis, noms, quantitats, preus, totals, base_imposable, iva, import_factura){
        this.codi_factura = codi_factura;
        this.codis = codis;
        this.noms = noms;
        this.quantitats = quantitats;
        this.preus = preus;
        this.totals = totals;
        this.base_imposable = base_imposable;
        this.iva = iva;
        this.import_factura = import_factura;
    }

    getCodiFactura() {
        return this.codi_factura;
    }

    getCodis() {
        return this.codis;
    }

    getNoms() {
        return this.noms;
    }

    getQuantitats() {
        return this.quantitats;
    }

    getPreus() {
        return this.preus;
    }

    getTotals() {
        return this.totals;
    }

    getBaseImposable() {
        return this.base_imposable;
    }

    getIva() {
        return this.iva;
    }

    getImportFactura() {
        return this.import_factura;
    }

    setCodiFactura(codi_factura) {
        this.codi_factura = codi_factura;
    }

    setCodis(codis) {
        this.codis = codis;

    }

    setNoms(noms) {
        this.noms = noms;
    }

    setQuantitats(quantitats) {
        this.quantitats = quantitats;
    }

    setPreus(preus) {
        this.preus = preus;
    }

    setTotals(totals) {
        this.totals = totals;
    }

    setBaseImposable(base_imposable) {
        this.base_imposable = base_imposable;
    }

    setIva(iva) {
        this.iva = iva;
    }

    setImportFactura(import_factura) {
        this.import_factura = import_factura;
    }
}

var nFactura = parseInt(localStorage.getItem("last_key")) + 1;
var factura = new Factura(nFactura);

function novaFactura(){
    document.getElementsByTagName("p")[0].innerHTML = "2022/" + factura.getCodiFactura();
}

function calcularTotal() {
    var inputs = document.getElementsByClassName("quantitat");
    var totals = document.getElementsByClassName("total");
    var preus = document.getElementsByClassName("preu");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value >= 0 && inputs[i].value <= 10) {
            totals[i].innerHTML = inputs[i].value * preus[i].innerHTML;            
        }
    }
}

function canvisTotal() {
    var totals = document.getElementsByClassName("total");
    var suma_totals = 0;
    for (let i = 0; i < totals.length; i++) {
        suma_totals += parseInt(totals[i].innerHTML);
    }
    document.getElementsByTagName("p")[1].innerHTML = suma_totals;
    var base_imposable =  document.getElementsByTagName("p")[1].innerHTML
    document.getElementsByTagName("p")[2].innerHTML = ((suma_totals/100)*21).toFixed(2);
    var iva = document.getElementsByTagName("p")[2].innerHTML
    document.getElementsByTagName("p")[3].innerHTML = (parseFloat(base_imposable) + parseFloat(iva)).toFixed(2);
    var total = document.getElementsByTagName("p")[3].innerHTML;

    
    if (total != 0) {
        let taula = document.getElementsByTagName("table")[0];
        let n_files = taula.rows.length;
        let codis = [];
        let noms = [];
        let quantitats = [];
        let preus = [];
        let totals = [];
        for (let i = 0; i < n_files - 1; i++) {
            let codi = document.getElementsByClassName("codi")[i].innerHTML;
            let nom = document.getElementsByClassName("nom")[i].innerHTML;
            let quantitat = document.getElementsByClassName("quantitat")[i].value;
            let preu = document.getElementsByClassName("preu")[i].innerHTML;
            let total = document.getElementsByClassName("total")[i].innerHTML;

            codis.push(codi);
            noms.push(nom);
            quantitats.push(quantitat);
            preus.push(preu);
            totals.push(total);
        }

        var base_imposable = document.getElementsByTagName("p")[1].innerHTML;
        var iva = document.getElementsByTagName("p")[2].innerHTML;
        var import_factura = document.getElementsByTagName("p")[3].innerHTML;

        factura.setCodis(codis);
        factura.setNoms(noms);
        factura.setQuantitats(quantitats);
        factura.setPreus(preus);
        factura.setTotals(totals);
        factura.setBaseImposable(base_imposable);
        factura.setIva(iva);
        factura.setImportFactura(import_factura);

        if (factura.getCodiFactura() > parseInt(localStorage.getItem("last_key"))) {
            localStorage.setItem("last_key", factura.getCodiFactura().toString());
        }
        localStorage.setItem(factura.getCodiFactura().toString(), JSON.stringify(factura))
        
    }else{
        localStorage.removeItem(factura.getCodiFactura().toString())
        localStorage.setItem("last_key", (factura.getCodiFactura() - 1).toString())
    }
}

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
            
            console.log(factura_recuperada);
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

function laodRecuperar() {
    var botoRecuperar = document.getElementsByTagName("button")[1];
    botoRecuperar.onclick = recuperarFactura;
}

export {calcularTotal, canvisTotal, novaFactura, laodRecuperar};