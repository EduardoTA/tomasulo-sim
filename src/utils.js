import Inst from 'inst.js'

export function parseInput(textInput) {
    let instructions = []
    
    let linhas = textInput.split("\n");
    for (linha of linhas) {
        linha = linha.trim()
        linha = linha.split(" ")
        let opcode = linha[0];
        let i = undefined;
        let j = undefined;
        let k = undefined;
        if (linha[1]) { //Não é FENCE.I
            let re = /\(([^)]+)\)/;
            if (linha[1].match(re)) {
                i = linha[1].split(",")[0];
                j = linha[1].split(",")[1].split("(")[0];
                k = linha[1].match(re)[1];
            } else {
                linha = linha[1].split(",")
                i = linha[0];
                if (linha[1]) j = linha[1];
                if (linha[2]) k = linha[2];
            }
        }
        instructions.push(new Inst(opcode, i, j, k))
    }
    return instructions;
}
