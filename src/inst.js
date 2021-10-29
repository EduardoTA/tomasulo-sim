class Inst {
    constructor (op, fields){
        this.op = op // Código de operação
        this.fields = fields // Valor dos campos, primeiro sempre é destiantion, se houver
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