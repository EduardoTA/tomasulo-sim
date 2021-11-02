class Register {
    constructor(name) {
        this.name = name
        this.Qi = 0
        this.v = 0
    }
}

class RegisterFile {
    constructor(nReg) {
        this.nReg = nReg // Número de registradores
        this.regs = []
        for (let i=0; i<nReg; i++) {
            this.regs.push(new Register ("R" + i))
        }
    }
}