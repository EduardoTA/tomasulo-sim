class Register {
    constructor(name) {
        this.name = name
        this.Qi = 0
        this.v = 0
    }
    getQi = () => {
        if (this.name === "R0")
            return 0
        else
            return this.Qi
    }
    setQi = (Qi) => {
        if (this.name === "R0")
            this.Qi = 0
        else
            this.Qi = Qi
    }
    getValue = () => {
        if (this.name === "R0")
            return 0
        else
            return this.v
    }
    setValue = (v) => {
        if (this.name === "R0")
            this.v = 0
        else
            this.v = v
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