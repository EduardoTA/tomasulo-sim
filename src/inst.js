class Inst {
    constructor (op, rd, rs1, rs2, imm, issueTime, execTime, wbTime){
        this.op = op // Código de operação
        this.rd = rd // Campo destino
        this.rs1 = rs1 // Campo origem 1
        this.rs2 = rs2 // Campo origem 2
        this.imm = imm // Campo Immediate
        this.issueTime = issueTime
        this.execTime = execTime
        this.wbTime = wbTime

        this.finishedIssue = 0
        this.finishedExec = 0
        this.finishedWb = 0
    }
}
