class ReservationStation {
    constructor() {
        this.busy = false; //boolean
        this.op; //string
        this.vj; //string
        this.vk; //string
        this.Qj; //referencia ReservationStation
        this.Qk; //referencia ReservationStation
        this.tempo = 0;
    }
}

class ReservationStationFile {
    constructor(size, ops) {
        this.size = size // numero de RS
        this.ops = ops // array de strings com as operações suportadas
        
        this.reservationStations = []
        for (let i=0; i<size; i++){
            this.reservationStations.push(
                new ReservationStation()
            )
        }
    }
}


