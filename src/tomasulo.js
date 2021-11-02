let regFile = new RegisterFile (32)

let instList = [
    // (op, rd, rs1, rs2, imm, issueTime, execTime, wbTime)
    new Inst({op:"add", rd:"R0", rs1:"R1", rs2:"R2", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    new Inst({op:"slti", rd:"R3", rs1:"R2", imm:2, issueTime:1, execTime:2, wbTime:1, regFile:regFile}),
    new Inst({op:"slt", rd:"R4", rs1:"R0", rs2:"R1", issueTime:1, execTime:3, wbTime:1, regFile:regFile}),
    new Inst({op:"bne", rs1:"R3", rs2:"R4", imm:3, issueTime:1, execTime:4, wbTime:1, regFile:regFile})
]
let arithInstList = [
    "auipc",
    "addi",
    "jal",
    "add",
    "addi",
    "slti",
    "slt",
    "bne"
]
let loadStoreInstList = [
    "lui",
    "lw"
]

let instUnit = new InstUnit (instList)
let arithReservationStationFile = new ReservationStationFile(3, arithInstList, 2)
let loadStoreReservationStationFile = new ReservationStationFile(2, loadStoreInstList, 1)
let issueUnit = new IssueUnit (instUnit, [arithReservationStationFile, loadStoreReservationStationFile], regFile)

let t = 0 // Tempo
let i = 0 // Temporário

// Executado no carregamento da página
window.onload = () => {
    // let CDB = null // Mensagem no CDB
    // let readyToBeExec // Fila com as RSs prontas para entrar em execução
    // let oldIssueRS // Reservation station sendo issued no último ciclo
    // let IssueRS // Reservation station sendo issued ciclo atual

    while (t < 1000 && i < 1000) { // TODO: Condição de parada
        issueUnit.iterate(t) // t++
        // oldIssueRS = IssueRS
        // IssueRS = issueIterate(oldIssueRS, readyToBeExec)
        // execIterate(readyToBeExec)
        t++
        i++
    }
}

