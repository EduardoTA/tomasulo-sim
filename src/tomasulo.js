window.onload = () => {
    let instList = [
        new Inst("add", "t0", "t1", "t2"),
        new Inst("slti", "t3", "t2", "0"),
        new Inst("slt", "t4", "t0", "t1"),
        new Inst("bne", "t3", "t4", "3")
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

    let t = 0 // Tempo

    while (true) {
        if (instList.length > 0) {
            let inst = instList[0]
            let op = inst.op

            
        }
    }
}