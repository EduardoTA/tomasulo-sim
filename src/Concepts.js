// Unidade de Intruções
// Guarda a fila de instruções a serem emitidas
// Guarda array com instruções que já foram emitidas
class InstUnit {
    constructor (instFIFO) {
        this.instFIFO = instFIFO // Fila com intruções a serem emitidas
        this.instFIFOFetched = [] // Fila com instruções já emitidas
    }
    // Retorna a 1ª instrução da fila
    fetchInst = () => {
        if (this.instFIFO.length > 0) {
            return this.instFIFO[0]
        } else {
            return null
        }
    }
    // Remove a 1ª instrução da fila
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
        this.rs = null // Reservation Station para a qual ele está fazendo Issue

        this.instUnit = instUnit // Referência à Instruction Unit
        this.reservationStationFiles = reservationStationFiles // Array com referências às reservation station files
        this.regFile = regFile // Referência ao register file
    }

    // Encontra e retorna uma reservation station livre, dada a instrução
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
        // Verifica se a Unidade de Emissão não está ocupada emitindo instrução na Reservation Station this.rs
        if (this.rs) {
            // Se houver instrução sendo issued,

            // Verifica se, neste ciclo de clock, se o contador de tempo de emissão terminou
            if (this.rs.finishedIssue()) {
                // Se terminou
                this.rs.reservationStationFile.finishedIssuing(this.rs) // Notifica para a reservation station que terminou a emissão
                this.rs.inst.finishedIssue = t // Registra na instrução o tempo que houve terminou emissão
                this.rs.putIntoRS (this.regFile) // Commita instrução na reservation station

                // Agora que a instrução foi emitida, pode-se trabalhar sobre uma nova reservation station
                this.rs = null

                this.iterate(t) // Linha executada para o tempo t ficar certo
            } else {
                // Se ainda não terminou
                // decrementar contador de tempo de emissão
                this.rs.issueTime--
            }
        } else {
            // Se não houver instrução sendo issued, fazer fetch, se houver RS livre
            let inst = this.instUnit.fetchInst() // Última instrução da FIFO da Instruction Unit
            // Verifica se existe instrução na queue
            if (inst) {
                // Caso haja,
                let rs = this.findFreeRS(inst) // verifica se existe reservation station livre
                if (rs) {
                    // Se houver Reservation station livre

                    rs.status = "awaiting issue"
                    inst = instUnit.unshiftInst()
                    
                    // Insere instrução em Reservation Station
                    this.rs = rs
                    this.rs.inst = inst
                    this.rs.issueTime = inst.issueTime
                    this.rs.execTime = inst.execTime
                    this.rs.wbTime = inst.wbTime
                    this.iterate(t)  // Para o tempo ficar certo
                }  
            }
        }
    }
}

// Unidade de Writeback
class WbUnit {
    constructor (reservationStationFiles, regFile) {
        this.rs = null // Reservation Station cujo writeback está sendo realizado
        this.reservationStationFiles = reservationStationFiles // Array com referências às reservation station files
        this.regFile = regFile // Referência ao register file
    }

    iterate = (t) => {
        if (!this.rs) {
            let reservationStationFile = this.reservationStationFiles.find(element => element.finishedExec.length > 0)
            if (reservationStationFile) {
                let rs = reservationStationFile.finishedExec.shift()
                if (rs) {
                    this.rs = rs
                }
            }
        } else {
            if (this.rs.finishedWb()) {
                this.rs.inst.finishedWb = t
                this.regFile.regs.forEach(element => {if (element.Qi === this.rs) {element.Qi = 0; element.v = this.rs.vk;}});
                this.reservationStationFiles.forEach(element => {
                    element.reservationStations.forEach(rs => {
                        if (rs.qj === this.rs) {
                            rs.qj = 0
                            rs.vj = this.rs.vk
                        }
                        if (rs.qk === this.rs) {
                            rs.qk = 0
                            rs.vk = this.rs.vk
                        }
                    })
                })
                this.rs.clean()
                this.rs = null
            } else {
                this.rs.wbTime--
            }
        }
    }
}