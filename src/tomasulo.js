let instList = [
    // (op, rd, rs1, rs2, imm, issueTime, execTime, wbTime)
    new Inst("add", "R0", "R1", "R2", undefined, 1, 3, 1),
    new Inst("slti", "R3", "R2", undefined, 2, 1, 2, 1),
    new Inst("slt", "R4", "R0", "R1", undefined, 1, 3, 1),
    new Inst("bne", undefined, "R3", "R4", 3, 1, 4, 1)
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

let regFile = new RegisterFile (32)

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

