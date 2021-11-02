// Objeto com array de registradores
let regFile = new RegisterFile (32)

// Array de instruções a serem executadas
let instList = [
    new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    new Inst({op:"add", rd:"R2", rs1:"R2", rs2:"R1", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    //new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:4, wbTime:1, regFile:regFile})
]

// Reservation Station File é um conjunto de Reservation Stations
// lista de op_codes das intruções executáveis pelas UFs conectadas à arithReservationStationFile
let arithInstList = [
    "auipc",
    "addi",
    "jal",
    "add",
    "addi",
    "slti",
    "slt",
    "bne"
    // TODO: completar esta lista
]

// lista de op_codes das intruções executáveis pelas UFs conectadas à loadStoreReservationStationFile
let loadStoreInstList = [
    "lui",
    "lw"
    // TODO: completar esta lista
]

// Unidade de instruções
let instUnit = new InstUnit (instList)

// Reservation Station File de operações aritméticas e lógicas
let arithReservationStationFile = new ReservationStationFile(3, arithInstList, 2)
// Reservation Station File de operações load/store
let loadStoreReservationStationFile = new ReservationStationFile(2, loadStoreInstList, 1)

// Unidade de Emissão de instruções
let issueUnit = new IssueUnit (instUnit, [arithReservationStationFile, loadStoreReservationStationFile], regFile)

// Unidade de Writeback
let wbUnit = new WbUnit ([arithReservationStationFile, loadStoreReservationStationFile], regFile)

let t = 0 // Tempo

// Executado no carregamento da página
window.onload = () => {
    while (t < 1000) { // TODO: Condição de parada
        issueUnit.iterate(t)
        arithReservationStationFile.iterate(t)
        wbUnit.iterate(t)
        // TODO: loadStoreReservationStationFile.iterate(t, CDB)
        t++
    }
}

