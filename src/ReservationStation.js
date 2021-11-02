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
    // finishedExec = () => {
    //     if (execTime <= 0) return true
    //     return false
    // }
    // finishedWb = () => {
    //     if (wbTime <= 0) return true
    //     return false
    // }
    
    // Envia a instrução inst para a Reservation Station
    putIntoRS = (regFile) => {
        if (["addi", "slti", "sltiu", "xori", "ori", "andi", "slli", "srli", "srai"].includes(this.inst.op)) {
            
            this.qj = this.inst.rs1.Qi
            if (!this.qj)
                this.vj = this.inst.rs1.v
            this.vk = this.inst.imm
            this.inst.rd.Qi = this
        } else if (["add", "sub", "sll", "slt", "sltu", "xor", "srl", "sra", "or", "and"].includes(this.inst.op)) {
            this.qj = this.inst.rs1.Qi
            if (!this.qj)
                this.vj = this.inst.rs1.v
            this.qk = this.inst.rs2.Qi
            if (!this.qk)
                this.vk = this.inst.rs2.v
            this.inst.rd.Qi = this
        }
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

        this.reservationStations = []

        // Se o objeto instanciado for a superclasse, então chamar método da superclasse
        if (new.target === ReservationStationFile)
            this.instanciateRSs()

        // this.Ufs = []
        // for (let i=0; i<nUfs; i++){
        //     this.Ufs.push(
        //         new Uf()
        //     )
        // }

        this.rsQueue = [];
        this.rsIssue = [];
        this.rsExecuting = [];
        this.rsWaitWB = [];

        this.finishedIssue = [] // FIFO com as instruções/RSs que terminaram issue
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
    issue = (reservationStation) => {
        this.finishedIssue.push(reservationStation)
    }

    // iterar = () => {
    //     for (let rs in this.rsWaitWB) { //TODO: Implementar espera por CDB e ordem de instruções
    //         rs.tempoWb--;
    //         if (rs.tempoWb < 0) {
    //             rs.busy = false; //TODO: Reinicializar parametros restantes da RS
    //         }
    //     }

    //     for (let rs in this.rsExecuting) {
    //         rs.tempoExec--;
    //         if (rs.tempoExec < 0) this.rsWaitWB.push(rs);
    //     }
    //     this.rsExecuting = this.rsExecuting.filter(rs => rs.tempoExec >= 0);

    //     while (this.rsExecuting.length < this.nUfs) {
    //         if (this.rsQueue[0] && this.rsQueue[0].tempoIssue === 0) {
    //             let rs = this.rsQueue.shift();
    //             this.rsExecuting.push(rs);
    //         } else break;
    //     }

    //     for (let rs in this.rsIssue) {
    //         rs.tempoIssue--;
    //     }
    //     this.rsIssue = this.rsIssue.filter(rs => rs.tempoIssue >= 0);
    // }

    // issue = (inst) => {
    //     let rsIndex = this.availableRS();
    //     if (rsIndex === null) return false; // Não há Reservation Stations disponíveis
    //     this.rsQueue.push(rsIndex);
    //     this.reservationStations[rsIndex].inst = inst;
    //     this.reservationStations[rsIndex].busy = true;
    //     //TODO: atualiza variáveis da RS
    //     this.rsIssue.push(this.reservationStations[rsIndex]);
    // }
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
