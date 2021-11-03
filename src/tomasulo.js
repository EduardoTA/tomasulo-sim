// Objeto com array de registradores
let regFile = new RegisterFile (4)

// Array de instruções a serem executadas
let instList = [
    new Inst({op:"addi",rd:"R1",rs1:"R0",imm:3, regFile:regFile}),
    new Inst({op:"sb", rs2:"R1", rs1:"R0", imm:0, regFile:regFile}),
    new Inst({op:"lb", rd:"R3", rs1:"R0", imm:0,  regFile:regFile}),
    //new Inst({op:"xori", rd:"R2", rs1:"R1", imm:543, issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    //new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    //new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:4, wbTime:1, regFile:regFile})
]

// Reservation Station File é um conjunto de Reservation Stations
// lista de op_codes das intruções executáveis pelas UFs conectadas à arithReservationStationFile
let arithInstList = [
    "lui",
    "jal",
    "jalr",
    "beq",
    "bne",
    "blt",
    "bge",
    "bltu",
    "bgeu",
    "addi",
    "slti",
    "xori",
    "ori",
    "andi",
    "slli",
    "srli",
    "add",
    "sub",
    "sll",
    "slt",
    "xor",
    "srl",
    "or",
    "and"
    // TODO: completar esta lista
]

// lista de op_codes das intruções executáveis pelas UFs conectadas à loadStoreReservationStationFile
let loadStoreInstList = [
    "sb",
    "lb"
    // TODO: completar esta lista
]

// Unidade de instruções
let instUnit = new InstUnit (instList)

// Reservation Station File de operações aritméticas e lógicas
let arithReservationStationFile = new ReservationStationFile(3, arithInstList, 2)
// Reservation Station File de operações load/store
let loadStoreReservationStationFile = new MemReservationStationFile(2, loadStoreInstList)

// Unidade de Emissão de instruções
let issueUnit = new IssueUnit (instUnit, [arithReservationStationFile, loadStoreReservationStationFile], regFile)

// Unidade de Writeback
let wbUnit = new WbUnit ([arithReservationStationFile, loadStoreReservationStationFile], regFile)

// Unidade de Memória
let memUnit = new MemUnit (1000)

let t = 0 // Tempo

// Executado no carregamento da página
window.onload = () => {
    while (t < 1000) { // TODO: Condição de parada
        issueUnit.iterate(t)
        arithReservationStationFile.iterate(t)
        loadStoreReservationStationFile.iterate(t,memUnit)
        wbUnit.iterate(t)
        // TODO: loadStoreReservationStationFile.iterate(t, CDB)
        t++
    }
    console.log(instUnit)
    console.log(arithReservationStationFile)
    console.log(loadStoreReservationStationFile)
    console.log(regFile)
    console.log(wbUnit)

    console.table(instList, ["op", "finishedIssueAt", "finishedExecAt", "finishedWbAt"])
}

