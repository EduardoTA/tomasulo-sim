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
    fetch = () => {
        if (this.instFIFO.length > 0) {
            this.instFIFOFetched.unshift(this.instFIFO[this.instFIFO.length-1])
            return this.instFIFO.pop()
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
    iterate = () => {
        if (this.rs) {
            // Se houver instrução sendo issued,
            // Verificar se terminou, caso contrário decrementar o contador
            if (this.rs.finishedIssue()) {
                this.finishedIssue.push(this.rs)
                this.rs = null
            } else {
                this.rs.issueTime--
            } 
        } else {
            // Se não houver instrução sendo issued, fazer fetch, se houver RS livre
            if (instUnit.instFIFO.length > 0) { // Verifica se existe instrução na queue
                let inst = this.instUnit.instFIFO[this.instUnit.instFIFO.length-1] // Última instrução da FIFO da Instruction Unit
                let rs = this.findFreeRS (inst)
                if (rs) {
                    rs.status = "awaiting issue"
                    inst = instUnit.fetch()
                    
                    // Inserindo instrução em Reservation Station
                    this.rs = rs
                    this.rs.issueTime = inst.issueTime
                }
            }
        }
    }
    issue = () => {
        return this.finishedIssue.shift()
    }
}