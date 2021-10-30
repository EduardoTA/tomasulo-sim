class Inst {
    constructor (op, i, j, k, issueTime, execTime, wbTime){
        this.op = op // Código de operação
        this.i = i //Campo destino
        this.j = j //Campo origem 1
        this.k = k //Campo origem 2
        this.issueTime = issueTime
        this.execTime = execTime
        this.wbTime = wbTime
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