class ReservationStation {
    constructor(ReservationStationFile) {
        // Enum com valores de códigos de status
        this.statusCodes = {
            BUSY: "busy",
            IDLE: "idle",
            AWAITING_ISSUE: "awaiting issue",
            AWAITING_WB: "awaiting writeback"
        }

        this.inst; //referencia Inst
        this.ReservationStationFile = ReservationStationFile // Referencia ao file correspondente

        this.status = this.statusCodes.IDLE // Código de status da RS
        this.op; //string
        this.vj; //string
        this.vk; //string
        this.Qj; //referencia ReservationStation
        this.Qk; //referencia ReservationStation

        this.issueTime
        this.execTime
        this.wbTime
    }

    finishedIssue = () => {
        if (issueTime <= 0) {
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
}

class MemReservationStation extends ReservationStation {
    constructor(ReservationStationFile) {
        super(ReservationStationFile)
        this.address;
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
    }

    // Instancia o número de RSs corretas
    instanciateRSs = () => {
        for (let i=0; i<this.nRSs; i++){
            this.reservationStations.push(
                new ReservationStation(this)
            )
        }
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

    // availableRS = () => {
    //     for (let i = 0; i < this.reservationStations.length; i++) {
    //         if (this.reservationStations[i].busy == false) return i;
    //     }
    //     return null;
    // }

    // Método para colocar em uma RS livre uma instrução
    // putIntoRS = (inst, regFile) => {
    //     // Encontra a primeira RS livre
    //     let rs = reservationStations.find(element => element.status === "idle")

    //     if (rs) {
    //         rs.inst = inst
    //         rs.status = this.statusCodes.AWAITING_ISSUE // Código de status da RS
    //         rs.op = inst.op

    //         rs.issueTime = inst.issueTime
    //         rs.execTime = inst.execTime
    //         rs.wbTime = inst.wbTime
            
    //         Rj = regFile.find(element => element.name === inst.j) // Encontra registrador do argumento j
    //         Rk = regFile.find(element => element.name === inst.j) // Encontra registrador do argumento k
            
    //         if (!Rj) // Se não for encontrado registrador, então era imediato
    //             rs.vj = inst.j
    //         else {
    //             // TODO tratamento caso seja encontrado regitrador
    //         }
    //         if (!Rk) // Se não for encontrado registrador, então era imediato
    //             rs.vk = inst.k
    //         else {
    //             // TODO tratamento caso seja encontrado regitrador
    //         }

    //         return rs
    //     } else {
    //         // Se não houver RS livre
    //         return null
    //     }
    // }
}

class MemReservationStationFile extends ReservationStationFile {
    constructor(nRSs, ops) {
        super(nRSs, ops, 1) // Número de UFs obrigatoriamente 1
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
