class ReservationStation {
    constructor() {
        this.inst; //referencia Inst
        this.busy = false; //boolean
        this.op; //string
        this.vj; //string
        this.vk; //string
        this.Qj; //referencia ReservationStation
        this.Qk; //referencia ReservationStation
        this.tempoExec = 4;
        this.tempoIssue = 3;
        this.tempoWb = 1;
    }
}

class ReservationStationFile {
    constructor(size, ops, nUfs) {
        this.size = size // numero de RS
        this.ops = ops // array de strings com as operações suportadas
        this.nUfs = nUfs // Número de UFs ligadas a essas RSs

        this.reservationStations = []
        for (let i=0; i<size; i++){
            this.reservationStations.push(
                new ReservationStation()
            )
        }

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

    iterar = () => {
        for (let rs in this.rsWaitWB) { //TODO: Implementar espera por CDB e ordem de instruções
            rs.tempoWb--;
            if (rs.tempoWb < 0) {
                rs.busy = false; //TODO: Reinicializar parametros restantes da RS
            }
        }

        for (let rs in this.rsExecuting) {
            rs.tempoExec--;
            if (rs.tempoExec < 0) this.rsWaitWB.push(rs);
        }
        this.rsExecuting = this.rsExecuting.filter(rs => rs.tempoExec >= 0);

        while (this.rsExecuting.length < this.nUfs) {
            if (this.rsQueue[0] && this.rsQueue[0].tempoIssue === 0) {
                let rs = this.rsQueue.shift();
                this.rsExecuting.push(rs);
            } else break;
        }

        for (let rs in this.rsIssue) {
            rs.tempoIssue--;
        }
        this.rsIssue = this.rsIssue.filter(rs => rs.tempoIssue >= 0);
    }

    issue = (inst) => {
        let rsIndex = availableRS();
        if (rsIndex === null) return false; // Não há Reservation Stations disponíveis
        this.rsQueue.push(rsIndex);
        this.reservationStations[rsIndex].inst = inst;
        this.reservationStations[rsIndex].busy = true;
        //TODO: atualiza variáveis da RS
        this.rsIssue.push(this.reservationStations[rsIndex]);
    }

    availableRS = () => {
        for (let i = 0; i < this.reservationStations.length; i++) {
            if (this.reservationStations[i].busy == false) return i;
        }
        return null;
    }
}


