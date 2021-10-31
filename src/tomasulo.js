let instList = [
    new Inst("add", "R0", "R1", "R2", 3),
    new Inst("slti", "R3", "R2", "0", 3),
    new Inst("slt", "R4", "R0", "R1", 3),
    new Inst("bne", "3", "R3", "R4", 3) // Instrução de branch ajustada para registradores de source ficarem em j e k
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

