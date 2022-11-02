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

var factura = new Factura(parseInt(localStorage.getItem("last_key")) + 1);

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

    var codi_html = document.getElementsByTagName("input")[document.getElementsByTagName("input").length -1].value;
    var codi_separat = codi_html.split("/");

    //Quan es recupera una factura fiquem el nº de factura de la factura recuperada a l'objecte factura que fem servir
    if (parseInt(localStorage.getItem("last_key") + 1) > parseInt(codi_separat[1])) {
        factura.setCodiFactura(parseInt(codi_separat[1]));
    }

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

        //Canviarem la "last_key" només quan sigui una factura nova (no recuperada)
        if (parseInt(factura.getCodiFactura()) > parseInt(localStorage.getItem("last_key"))) {
            localStorage.setItem("last_key", factura.getCodiFactura().toString());
        }
        localStorage.setItem(factura.getCodiFactura().toString(), JSON.stringify(factura));
        
    }else{
        localStorage.removeItem(factura.getCodiFactura().toString());

        //Canviarem la "last_key" només quan sigui una factura nova (no recuperada)
        if (parseInt(factura.getCodiFactura()) > parseInt(localStorage.getItem("last_key"))){
            localStorage.setItem("last_key", (factura.getCodiFactura() - 1).toString());
        }
        var taula = document.getElementsByTagName("table")[0];
        taula.innerHTML = "<tr><th>Codi</th><th>Nom</th><th>Quantitat</th><th>Preu</th><th>Total</th></tr>";
    }
}

export {calcularTotal, canvisTotal, novaFactura, Factura};