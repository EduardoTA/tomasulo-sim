class Inst {
    constructor (op, i, j, k, issueTime, execTime, wbTime){
        this.op = op // Código de operação
        this.instClass = 
        this.i = i //Campo destino
        this.j = j //Campo origem 1
        this.k = k //Campo origem 2
        this.issueTime = issueTime
        this.execTime = execTime
        this.wbTime = wbTime

        this.finishedIssue = 0
        this.finishedExec = 0
        this.finishedWb = 0
    }
}