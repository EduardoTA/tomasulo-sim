document.getElementById("applyBTN").onclick = parseInput;

function parseInput() {
    textInput = document.getElementById("instrucoes").value
    let instructions = []
    let linhas = textInput.split("\n");
    for (let linha of linhas) {
        linha = linha.trim()
        linha = linha.split(" ")
        let opcode = linha[0];
        switch (opcode) {
            case 'add': case  'sub': case  'sll': case 'slt': case 'sltu': case 'xor': case 'srl': case 'sra': case 'or': case 'and': // Tipo R
                var [rd, rs1, rs2]  = linha[1].split(/[,()\n\s]+/);
                console.log([rd,rs1,rs2])
                instructions.push(new Inst({op:opcode, rd:rd, rs1:rs1, rs2:rs2, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            case 'addi': case 'slti': case 'sltiu': case 'xori': case 'ori': case 'andi': case 'slii': case 'srli': case 'srai': // Tipo I
                var [rd, rs1, imm]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, rs1:rs1, imm:imm, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            case 'sb': case 'sh': case 'sw': // Tipo S
                var [rs2, offset, rs1]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, offset:offset, rs1:rs1, rs2:rs2, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            case 'beq': case 'bne': case 'blt': case 'bge': case 'bltu': case 'bgeu': // Tipo SB
                var [rs1, rs2, offset]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, offset:offset, rs1:rs1, rs2:rs2, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            case 'lui': // Tipo U
                var [rd, imm]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, imm:imm, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            case 'jal': case 'auipc': // Tipo UJ
                var [rd, offset]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, offset:offset, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            case 'jalr':
                var [rd, rs1, offset]  = linha[1].split(/[,()]+/);
                instructions.push(new Inst({op:opcode, rd:rd, rs1:rs1, offset:offset, issueTime:1, execTime:3, wbTime:1, regFile:regFile}));
                break;
            }
        }
    console.log(instructions)
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
