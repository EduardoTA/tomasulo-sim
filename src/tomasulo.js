// Objeto com array de registradores
let regFile = new RegisterFile (32)

// Array de instruções a serem executadas
let instList = [
    new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    new Inst({op:"slti", rd:"R3", rs1:"R2", imm:2, issueTime:1, execTime:2, wbTime:1, regFile:regFile}),
    new Inst({op:"slt", rd:"R0", rs1:"R0", rs2:"R1", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    new Inst({op:"bne", rs1:"R3", rs2:"R4", imm:3, issueTime:1, execTime:4, wbTime:1, regFile:regFile})
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

let t = 0 // Tempo

// Executado no carregamento da página
window.onload = () => {
    // TODO: let CDB = null // Mensagem no CDB
    while (t < 1000) { // TODO: Condição de parada
        issueUnit.iterate(t)
        // TODO: arithReservationStationFile.iterate(t, CDB)
        // TODO: loadStoreReservationStationFile.iterate(t, CDB)
        t++
    }
}

