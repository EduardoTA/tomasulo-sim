// Define uma instrução do asm
class Inst {
    constructor (args){
        const {op, rd, rs1, rs2, imm, issueTime, execTime, wbTime} = args // Desmontagem do objeto args
        this.op = op // Código de operação
        this.rd = regFile.regs.find(element => element.name === rd) // Registrador destino
        this.rs1 = regFile.regs.find(element => element.name === rs1) // Registrador de origem 1
        this.rs2 = regFile.regs.find(element => element.name === rs2) // Registrador de origem 2
        this.imm = imm // Campo Immediate

        if (issueTime === undefined)
            this.issueTime = 1 // Latência de emissão padrão
        else
            this.issueTime = issueTime // Latência de emissão
        
        if (execTime === undefined)
            this.execTime = 1 // Latência de emissão padrão
        else
            this.execTime = execTime // Latência de emissão
        
        if (wbTime === undefined)
            this.wbTime = 1 // Latência de emissão padrão
        else
            this.wbTime = wbTime // Latência de emissão  

        this.finishedIssueAt = undefined // Contador de ciclos de clock usados para emitir instrução
        this.finishedExecAt = undefined // Contador de ciclos de clock usados para executar instrução
        this.finishedWbAt = undefined // Contador de ciclos de clock usados para dar writeback na instrução
    }
}
