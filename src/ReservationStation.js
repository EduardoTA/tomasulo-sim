class ReservationStation {
    constructor(reservationStationFile) {
        // Enum com valores de códigos de status
        this.statusCodes = {
            BUSY: "busy",
            IDLE: "idle",
            AWAITING_ISSUE: "awaiting issue",
            AWAITING_WB: "awaiting writeback"
        }

        this.inst; //referencia Inst
        this.reservationStationFile = reservationStationFile // Referencia ao file correspondente

        this.status = this.statusCodes.IDLE // Código de status da RS
        this.op; //string
        this.vj; //string
        this.vk; //string
        this.qj; //referencia ReservationStation
        this.qk; //referencia ReservationStation

        this.issueTime = 0
        this.execTime = 0
        this.wbTime = 0
    }
    finishedIssue = () => {
        if (this.issueTime <= 0) {
            this.status = this.statusCodes.BUSY
            return true
        }
        return false
    }
    finishedExec = () => {
        if (this.execTime <= 0) {
            this.status = this.statusCodes.AWAITING_WB
            return true
        }
        return false
    }
    finishedWb = () => {
        if (this.wbTime <= 0) {
            return true
        }
        return false
    }
    clean = () => {
        this.inst = null
        this.status = this.statusCodes.IDLE
        this.op = null
        this.vj = null
        this.vk = null
        this.qj = null
        this.qk = null

        this.issueTime = 0
        this.execTime = 0
        this.wbTime = 0
    }
    
    // Envia a instrução inst para a Reservation Station
    putIntoRS = (regFile) => {
        if ("lui" === this.inst.op) {
            this.vk = this.inst.imm
        } else if (["jalr", "addi", "slti", "xori", "ori", "andi", "slli", "srli"].includes(this.inst.op)) {
            this.qj = this.inst.rs1.Qi
            if (!this.qj)
                this.vj = this.inst.rs1.getValue()
            this.vk = this.inst.imm
        } else if (["beq", "bne", "blt", "bge", "bltu", "bgeu", "add", "sub", "sll", "slt", "sltu", "xor", "srl", "sra", "or", "and"].includes(this.inst.op)) {
            this.qj = this.inst.rs1.Qi
            if (!this.qj)
                this.vj = this.inst.rs1.getValue()
            this.qk = this.inst.rs2.Qi
            if (!this.qk)
                this.vk = this.inst.rs2.getValue()
        }
        this.inst.rd.Qi = this
    }
}

class MemReservationStation extends ReservationStation {
    constructor(ReservationStationFile) {
        super(ReservationStationFile)
        this.address;
    }
    putIntoRS = (regFile) => {
        // TODO: Implementar este método para este tipo de classe
    }
}

class ReservationStationFile {
    constructor(nRSs, ops, nUfs) {
        this.nRSs = nRSs // numero de RS
        this.ops = ops // array de strings com as operações suportadas
        this.nUfs = nUfs // Número de UFs ligadas a essas RSs

        this.reservationStations = [] // Array com as reservation stations deste file dereservation stations

        // Se o objeto instanciado for a superclasse, então chamar método da superclasse
        if (new.target === ReservationStationFile)
            this.instanciateRSs()
        // Se não for, então chamar instanciateRSs() da subclasse



        this.finishedIssue = [] // FIFO com as instruções/RSs que terminaram de ser issued
        this.exec = [] // Array com as reservation stations com instruções que estão sendo executadas no momento
        this.finishedExec = [] // FIFO com as instruções cuja execução já terminou
    }

    // Instancia o número de RSs corretas
    instanciateRSs = () => {
        for (let i=0; i<this.nRSs; i++){
            this.reservationStations.push(
                new ReservationStation(this)
            )
        }
    }

    // Insere nova RS na fila de RSs que acabaram de ser issued
    finishedIssuing = (reservationStation) => {
        this.finishedIssue.push(reservationStation)
    }

    // Faz um ciclo de execução das UFs ligadas a esse Reservation Station File
    iterate = (t) => {
        if (this.finishedIssue.length > 0 && this.exec.length < this.nUfs) {
            let rs = this.finishedIssue.find(element => !element.qj && !element.qk) // Encontra a primeira reservation station da fila com todas dependências resolvidas
            if (rs) {
                this.finishedIssue = this.finishedIssue.filter(element => element !== rs)
                this.exec.push(rs)
            }
        }
        if (this.exec.length > 0) {
            let rs = this.exec.find(element => element.finishedExec())
            if (rs) {
                this.finishedExec.push(rs)
                rs.status = "awaiting writeback"
                rs.inst.finishedExec = t
                switch (rs.inst.op) {
                    case "add": case "addi":
                        rs.vk = rs.vj + rs.vk
                    // TODO: implementar as outras operações
                }
                rs.qj = 0
                rs.qk = 0

                this.exec = this.exec.filter(element => element !== rs)
            }

            this.exec.forEach (element => {if (element) element.execTime--})
        }
    }
}

class MemReservationStationFile extends ReservationStationFile {
    constructor(nRSs, ops, regFile) {
        super(nRSs, ops, 1, regFile) // Número de UFs obrigatoriamente 1
        this.instanciateRSs()
    }

    instanciateRSs = () => {
        for (let i=0; i<this.nRSs; i++){
            this.reservationStations.push(
                new MemReservationStation(this)
            )
        }
    }
}
