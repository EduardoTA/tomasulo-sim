class MemBuf {
    constructor() {
        this.op; //string
        this.v;
        this.a;
        this.tempo = 0;
    }
}

class MemBufFile {
    constructor(size, ops) {
        this.size = size // numero de RS
        this.ops = ops // array de strings com as operações suportadas
        
        this.buffer = []
        for (let i=0; i<size; i++){
            this.buffer.push(
                new MemBuf()
            )
        }
    }
}