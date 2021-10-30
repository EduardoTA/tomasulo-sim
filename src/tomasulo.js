let instList = [
    new Inst("add", "R0", "R1", "R2"),
    new Inst("slti", "R3", "R2", "0"),
    new Inst("slt", "R4", "R0", "R1"),
    new Inst("bne", "3", "R3", "R4") // Instrução de branch ajustada para registradores de source ficarem em j e k
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
let arithReservationStationFile = new ReservationStationFile(3, arithInstList, 2)
let loadStoreReservationStationFile = new ReservationStationFile(2, loadStoreInstList, 1)

let regFile = new RegisterFile (32)

let t = 0 // Tempo

//Função que retorna qual RS File usar, baseada no op
let useThisRSFile = (op) => {
    if (arithReservationStationFile.ops.some(
        element => element == op
    )) {
        // Se for operacao aritmetica usar RSs aritmeticas
        return arithReservationStationFile 
    } else if (loadStoreReservationStationFile.ops.some(
        element => element == op
    )) {
        // Se for operacao loadstore usar RSs loadstore
        return loadStoreReservationStationFile
    }
}

let issueIterate = (oldIssueRS, readyToBeExec) => {
    if (!oldIssueRS){ // Se não havia instrução sendo issued
        if (instList.length > 0) { // Se houver instrução a ser issued
            let inst = instList[0]
            let op = inst.op
            let reservationStationFile = useThisRSFile(op)
            
            reservationStationFile.putIntoRS(inst, regFile)
            instList.shift() // Remove primeiro elemento da lista de instruções se puder dar issue 
        } else {
            return null
        }
    } else {
        if (oldIssueRS.finishedIssue()) {
            readyToBeExec.push(oldIssueRS)
            return null
        }
        else
            oldIssueRS.issueTime--
            return oldIssueRS
    }
}

// Executado no carregamento da página
window.onload = () => {
    let readyToBeExec // Vetor com as RSs prontas para entrar em execução
    //let readyToBeExec // Vetor com as RSs de memória prontas para entrar em execução
    let oldIssueRS // Reservation station sendo issued no último ciclo
    let IssueRS // Reservation station sendo issued ciclo atual
    while (t < 1000) { // TODO: Condição de parada
        oldIssueRS = IssueRS
        IssueRS = issueIterate(oldIssueRS, readyToBeExec)
        
        t++
    }
}

