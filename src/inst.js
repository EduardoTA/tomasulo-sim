class Inst {
    constructor (op, rd, rs1, rs2, imm, issueTime, execTime, wbTime, regFile){
        this.op = op // Código de operação
        this.rd = regFile.regs.find(element => element.name === rd) // Campo destino
        this.rs1 = regFile.regs.find(element => element.name === rs1) // Registrador de origem 1
        this.rs2 = regFile.regs.find(element => element.name === rs2) // Registrador de origem 2
        this.imm = imm // Campo Immediate
        this.issueTime = issueTime
        this.execTime = execTime
        this.wbTime = wbTime

        this.finishedIssue = 0
        this.finishedExec = 0
        this.finishedWb = 0
    }
}
