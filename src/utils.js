import Inst from 'inst.js'

export function parseInput(textInput) {
    let instructions = []
    
    let linhas = textInput.split("\n");
    for (const linha of linhas) {
        linha = linha.trim()
        linha = linha.split(" ")
        let opcode = linha[0];
        switch (opcode) {
            case ('add', 'sub', 'sll', 'slt', 'sltu', 'xor', 'srl', 'sra', 'or', 'and'): // Tipo R
                let [rd, rs1, rs2]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, rs1:rs1, rs2:rs2, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
            case ('addi', 'slti', 'sltiu', 'xori', 'ori', 'andi', 'slii', 'srli', 'srai'): // Tipo I
                let [rd, rs1, imm]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, rs1:rs1, imm:imm, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
            case ('sb', 'sh', 'sw'): // Tipo S
                let [rs2, offset, rs1]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, offset:offset, rs1:rs1, rs2:rs2, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
            case ('beq', 'bne', 'blt', 'bge', 'bltu', 'bgeu'): // Tipo SB
                let [rs1, rs2, offset]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, offset:offset, rs1:rs1, rs2:rs2, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
            case ('lui'): // Tipo U
                let [rd, imm]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, imm:imm, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
            case ('jal', 'auipc'): // Tipo UJ
                let [rd, offset]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, offset:offset, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
            case ('jalr'):
                let [rd, rs1, offset]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, rs1:rs1, offset:offset, issueTime:1, execTime:3, wbTime:1, regFile:regFile}))
        }
    }
    return instructions;
}
        // let i = undefined;
        // let j = undefined;
        // let k = undefined;
        // if (linha[1]) { //Não é FENCE.I
        //     let re = /\(([^)]+)\)/;
        //     if (linha[1].match(re)) {
        //         i = linha[1].split(",")[0];
        //         j = linha[1].split(",")[1].split("(")[0];
        //         k = linha[1].match(re)[1];
        //     } else {
        //         linha = linha[1].split(",")
        //         i = linha[0];
        //         if (linha[1]) j = linha[1];
        //         if (linha[2]) k = linha[2];
        //     }
        // }
