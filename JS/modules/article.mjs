class Article {
    constructor(codi, nom, quantitat, preu) {
        this.codi = codi;
        this.nom = nom;
        this.quantitat = quantitat;
        this.preu = preu;
    }

    getCodi() {
        return this.codi;
    }

    getNom() {
        return this.nom;
    }

    getQuantitat() {
        return this.quantitat;
    }

    getPreu() {
        return this.preu;
    }
}

export {Article};