class InstUnit {
    constructor (instFIFO) {
        this.instFIFO = instFIFO
    }
    fetch = () => {
        return instFIFO.pop()
    }
}

class IssueUnit {
    constructor (instUnit, reservationStationFiles) {
        this.busy = false
        this.rs = null // Reservation Station para a qual ele está fazendo Issue

        this.instUnit = instUnit // Referência à Instruction Unit
        this.reservationStationFiles = reservationStationFiles // Array com as referências às reservation station files

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
                this.finishedIssue.push(rs)
                this.rs = null
            }
            this.rs.issueTime--
        } else {
            // Se não houver instrução sendo issued, fazer fetch, se houver RS livre
            let inst = this.instUnit.instFIFO[this.instUnit.instFIFO.length-1] // Última instrução da FIFO da Instruction Unit
            let rs = this.findFreeRS (inst)
            if (rs)
                this.rs = this.instUnit.fetch()
        }
    }
    issue = () => {
        return this.finishedIssue.shift()
    }
}