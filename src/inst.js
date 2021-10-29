class Inst {
    constructor (op, i, j, k, tempoExec){
        this.op = op // Código de operação
        this.i = i //Campo destino
        this.j = j //Campo origem 1
        this.k = k //Campo origem 2
        this.tempoExec = tempoExec;
    }

    is = (time) => {
        this.isTime = time
    }

    ex = (time) => {
        this.exTime = time
    }

    wb = (time) => {
        this.wbTime = time
    }
}