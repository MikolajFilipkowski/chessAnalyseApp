import SquareClass from "./SquareClass"
import isDigit from "../../funcs/IsDigit"

export default class BoardClass {
    constructor(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
        this.board = []
        this.activeColor = ""
        this.whiteKingsideCastle = false
        this.whiteQueensideCastle = false
        this.blackKingsideCastle = false
        this.blackQueensideCastle = false
        this.enPassant = ""
        this.halfmoveClock = null
        this.fullmoveClock = null

        if (fen.length==0) return;
        this.fenToBoard(fen)
    }

    fenToBoard(fen) {
        let currRow = []
        let fragment = 0
        let column = 0
        let row = 0
        fen+=" "
        fen.split("").forEach((v) => {
            switch(fragment) {
                case 0:
                    if (v===" ") {
                        fragment++
                    }
                    if (v==="/" || v===" ") {
                        this.board.push(currRow)
                        currRow = []
                        row++
                        column = 0
                    }
                    else if (isDigit(v)) {
                        for (let i = 0; i<parseInt(v); i++) {
                            currRow.push(new SquareClass(column, row))
                            column++
                        }
                    }
                    else {
                        currRow.push(new SquareClass(column, row, v))
                        column++
                    }
                    break
                case 1:
                    if (v===" ") fragment++
                    else this.activeColor = v
                    break
                case 2:
                    if (v==="K") this.whiteKingsideCastle = true
                    else if (v==="Q") this.whiteQueensideCastle = true
                    else if (v==="k") this.blackKingsideCastle = true
                    else if (v==="q") this.blackQueensideCastle = true
                    else if (v===" ") fragment++
                    else fragment++
                    break
                case 3:
                    if (v===" ") fragment++
                    else this.enPassant+=v
                    break
                case 4:
                    if (v===" ") {
                        this.halfmoveClock = parseInt(this.halfmoveClock)
                        fragment++
                    }
                    else if (this.halfmoveClock === null) this.halfmoveClock = v
                    else this.halfmoveClock+=v
                    break
                case 5:
                    if (v===" ") this.fullmoveClock = parseInt(this.fullmoveClock)
                    else if (this.fullmoveClock === null) this.fullmoveClock = v
                    else this.fullmoveClock+=v
                    break
            }
        })

        //this.board = this.board.reverse()
    }

    boardToFen() {
        let fen = ""
        let emptyCounter = 0

        this.board.forEach((row) => {
            if (emptyCounter>0) {
                fen+=`${emptyCounter}`
                emptyCounter = 0
            }

            fen+="/"

            row.forEach((v) => {
                
                if (v.piece===null) emptyCounter++
                else {
                    if (emptyCounter>0) {
                        fen+=`${emptyCounter}`
                        emptyCounter = 0
                    }
                    fen+=v.piece
                }
            })
        })

        fen = fen.slice(1)

        fen += ` ${this.activeColor}`
        let castles = ""
        castles += this.whiteKingsideCastle ? "K" : ""
        castles += this.whiteQueensideCastle ? "Q" : ""
        castles += this.blackKingsideCastle ? "k" : ""
        castles += this.blackQueensideCastle ? "q" : ""

        fen += ` ${castles}`
        fen += castles.length===0 ? this.enPassant : ` ${this.enPassant}`
        fen += ` ${this.halfmoveClock}`
        fen += ` ${this.fullmoveClock}`

        return fen
    }
}
