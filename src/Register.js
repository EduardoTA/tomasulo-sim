class Register {
    constructor(name) {
        this.name = name
        this.Qi = 0
        this.v = 10
    }
}

// Conjunto de registradores
class RegisterFile {
    constructor(nReg) {
        this.nReg = nReg // Número de registradores
        this.regs = [] // Array com os registradores
        for (let i=0; i<nReg; i++) {
            this.regs.push(new Register ("R" + i))
        }
    }
}