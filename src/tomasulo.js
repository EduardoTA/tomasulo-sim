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

//Função que retorna qual RS File usar, baseada no op
// let useThisRSFile = (op) => {
//     if (arithReservationStationFile.ops.some(
//         element => element == op
//     )) {
//         // Se for operacao aritmetica usar RSs aritmeticas
//         return arithReservationStationFile 
//     } else if (loadStoreReservationStationFile.ops.some(
//         element => element == op
//     )) {
//         // Se for operacao loadstore usar RSs loadstore
//         return loadStoreReservationStationFile
//     }
// }

// // Função que faz o issue das instruções (issue simples)
// let issueIterate = (oldIssueRS, readyToBeExec) => {
//     if (!oldIssueRS){ // Se não havia instrução sendo issued
//         if (instList.length > 0) { // Se houver instrução a ser issued
//             let inst = instList[0]
//             let op = inst.op
//             let reservationStationFile = useThisRSFile(op)
            
//             let rs = reservationStationFile.putIntoRS(inst, regFile)
//             if (rs) {
//                 // Caso seja encontrada RS livre, retorná-la
//                 instList.shift() // Remove primeiro elemento da lista de instruções se puder dar issue 
//                 return rs
//             }
//             else
//                 return null
//         } else {
//             return null
//         }
//     } else {
//         if (oldIssueRS.finishedIssue()) {
//             readyToBeExec.push(oldIssueRS) // Empurrar na fila de execução
//             return null
//         }
//         else
//             oldIssueRS.issueTime--
//             return oldIssueRS
//     }
// }

// // // Função que faz a execução das instruções
// let execIterate = (readyToBeExec) => {

// }

// Executado no carregamento da página
window.onload = () => {
    // let CDB = null // Mensagem no CDB
    // let readyToBeExec // Fila com as RSs prontas para entrar em execução
    // let oldIssueRS // Reservation station sendo issued no último ciclo
    // let IssueRS // Reservation station sendo issued ciclo atual

    while (t < 1000) { // TODO: Condição de parada
        issueUnit.iterate()
        // oldIssueRS = IssueRS
        // IssueRS = issueIterate(oldIssueRS, readyToBeExec)
        // execIterate(readyToBeExec)
        t++
    }
}

