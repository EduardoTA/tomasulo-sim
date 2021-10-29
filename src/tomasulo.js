window.onload = () => {
    instList = [
        new Inst("add", "t0", "t1", "t2"),
        new Inst("slti", "t3", "t2", "0"),
        new Inst("slt", "t4", "t0", "t1"),
        new Inst("bne", "overflow", "t3", "t4")
    ]
}