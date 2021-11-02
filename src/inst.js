// Define uma instrução do asm
class Inst {
    constructor (args){
        const {op, rd, rs1, rs2, imm, issueTime, execTime, wbTime} = args // Desmontagem do objeto args
        this.op = op // Código de operação
        this.rd = regFile.regs.find(element => element.name === rd) // Registrador destino
        this.rs1 = regFile.regs.find(element => element.name === rs1) // Registrador de origem 1
        this.rs2 = regFile.regs.find(element => element.name === rs2) // Registrador de origem 2
        this.imm = imm // Campo Immediate
        this.issueTime = issueTime // Latência de emissão
        this.execTime = execTime // Latência de execução
        this.wbTime = wbTime // Latência de writeback

        this.finishedIssue = undefined // Contador de ciclos de clock usados para emitir instrução
        this.finishedExec = undefined // Contador de ciclos de clock usados para executar instrução
        this.finishedWb = undefined // Contador de ciclos de clock usados para dar writeback na instrução
    }
}
