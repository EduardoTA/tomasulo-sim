// Classificador de instruções
class InstClass {
    constructor () {
        this.classes = {
            ARITH: "arithmetic",
            MEM: "memory"
        }
        this.instSet = {
            "auipc": this.classes.ARITH,
            "addi": this.classes.ARITH,
            "jal": this.classes.ARITH,
            "add": this.classes.ARITH,
            "addi": this.classes.ARITH,
            "slti": this.classes.ARITH,
            "slt": this.classes.ARITH,
            "bne": this.classes.ARITH,
            "lui": this.classes.MEM,
            "lw": this.classes.MEM
        }
    }
}

// Unidade com Fila de Instruções
class InstUnit {
    constructor (instFIFO) {
        this.instFIFO = instFIFO
        this.instFIFOFetched = []
    }
    fetchInst = () => {
        if (this.instFIFO.length > 0) {
            return this.instFIFO[0]
        } else {
            return null
        }
    }
    unshiftInst = () => {
        if (this.instFIFO.length > 0) {
            this.instFIFOFetched.push (this.instFIFO[0])
            return this.instFIFO.shift()
        } else {
            return null
        }
    }
}

// Unidade de Emissão
class IssueUnit {
    constructor (instUnit, reservationStationFiles, regFile) {
        this.busy = false
        this.rs = null // Reservation Station para a qual ele está fazendo Issue

        this.instUnit = instUnit // Referência à Instruction Unit
        this.reservationStationFiles = reservationStationFiles // Array com as referências às reservation station files
        this.regFile = regFile // Referência ao register file

        this.finishedIssue = [] // FIFO com as instruções/RSs que terminaram issue
    }
    // Encontra uma reservation station livre, dada a instrução
    findFreeRS = (inst) => {
        for (const reservationStationFile of this.reservationStationFiles) {
            if (reservationStationFile.ops.includes(inst.op)) {
                for (const reservationStation of reservationStationFile.reservationStations) {
                    if (reservationStation.status === "idle")
                        return reservationStation
                }
            }
        }
        return null
    }
    iterate = (t) => {
        if (this.rs) {
            // Se houver instrução sendo issued,
            // Verificar se terminou, caso contrário decrementar o contador
            if (this.rs.finishedIssue()) {
                this.finishedIssue.push(this.rs)
                this.rs.inst.finishedIssue = t
                this.rs.putIntoRS (this.regFile)

                this.rs = null
                this.iterate(t) // Para o tempo ficar certo
            } else {
                this.rs.issueTime--
            }
        } else {
            // Se não houver instrução sendo issued, fazer fetch, se houver RS livre
            if (instUnit.fetchInst()) { // Verifica se existe instrução na queue
                let inst = this.instUnit.fetchInst() // Última instrução da FIFO da Instruction Unit
                let rs = this.findFreeRS(inst)
                if (rs) {
                    rs.status = "awaiting issue"
                    inst = instUnit.unshiftInst()
                    
                    // Inserindo instrução em Reservation Station
                    this.rs = rs
                    this.rs.inst = inst
                    this.rs.issueTime = inst.issueTime
                    this.iterate(t)  // Para o tempo ficar certo
                }  
            }
        }
    }
    issue = () => {
        return this.finishedIssue.shift()
    }
}