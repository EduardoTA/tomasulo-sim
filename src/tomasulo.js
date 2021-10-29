window.onload = () => {
    instList = [
        new Inst("add", "t0", "t1", "t2"),
        new Inst("slti", "t3", "t2", "0"),
        new Inst("slt", "t4", "t0", "t1"),
        new Inst("bne", "t3", "t4", "3")
    ]

    
    arith1 = new ReservationStation()
    arith2 = new ReservationStation()
    arith3 = new ReservationStation()
    
    loadstore1 = new ReservationStation()
    loadstore2 = new ReservationStation()


}