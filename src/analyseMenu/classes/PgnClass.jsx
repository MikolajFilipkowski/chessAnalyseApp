import MoveClass from "./MoveClass"
import isDigit from "../../funcs/IsDigit"
import BoardClass from "../../board/classes/BoardClass"
import colToLetter from "../../funcs/ColToLetter"

export default class PgnClass {
    constructor(pgn="") {
        if (pgn.length==0) return

        this.event = ""
        this.site = ""
        this.date = ""
        this.round = ""
        this.white = ""
        this.black = ""
        this.result = ""
        this.eco = ""
        this.whiteElo = ""
        this.blackElo = ""
        this.annotator = ""
        this.pgn = []

        this.moveCount = 0
        this.fullmoveCount = 1

        //this.ReadPGN(pgn)
        this.ReadPGN("1. e4 a5 2. e5 a4")
        this.pgnToFen(4)
    }

    ReadPGN(pgn) {   
        let pgnSplit = pgn.split("]").reverse()
        let [pgnAct, ...pgnInfo] = pgnSplit

        pgnAct = pgnAct.replaceAll("\n", "")
        
        pgnInfo = pgnInfo.reverse().join("]")+"]"
        pgnInfo = pgnInfo.replaceAll("\n", "").replaceAll("[", "").split("]").slice(0,-1)
        
        let funcArray = {
            "Event":(v) => this.event = v,
            "Site":(v) => this.site = v,
            "Date":(v) => this.date = v,
            "Round":(v) => this.round = v,
            "White":(v) => this.white = v,
            "Black":(v) => this.black = v,
            "Result":(v) => this.result = v,
            "ECO":(v) => this.eco = v,
            "WhiteElo":(v) => this.whiteElo = v,
            "BlackElo":(v) => this.blackElo = v,
            "Annotator":(v) => this.annotator = v,
            "":() => {}
        }

        pgnInfo.forEach((v) => {
            let [func, ...rest] = v.split(" ")
            rest = rest.join(" ").replaceAll("\"", "")
            funcArray[func](rest)
        })

        this.ProcessPgnAct(pgnAct)
    }

    ProcessPgnAct(pgn) {
        pgn = pgn.split(" ")
        pgn = pgn.filter((v, i) => i%3!==0)
        pgn = isDigit(pgn.slice(-1)[0]) ? pgn.slice(0,-1) : pgn

        let newPgn = []
        let curArr = []

        pgn.forEach((v) => {
            curArr.push(new MoveClass(v, curArr.length==0 ? "w" : "b"))

            if (curArr.length==2) {
                newPgn.push(curArr)
                curArr = []
            }
        })
        if (Math.ceil(pgn.length/2)!=newPgn.length) newPgn.push([new MoveClass(...pgn.slice(-1), "w")])

        this.moveCount = pgn.length
        this.fullmoveCount = newPgn.slice(-1).length==1 ? newPgn.length : newPgn.length+1
        this.pgn = newPgn
    }

    movedFrom(moved, board) {
        let movedFromSq = ""
        //let moved = new MoveClass()
        //let curBoard = new BoardClass()
        
        if(!moved.piece) return null

        console.log(moved)

        switch(moved.piece.piece) {
            case "p": {
                if (moved.isCapture) {
                    if (moved.multiplePieces==="") {
                        if (moved.color==="w") {
                            if (board.board[7-moved.moveRow+1][moved.moveCol+1].piece=="P")
                                movedFromSq = `${colToLetter(moved.moveCol+1)}${moved.moveRow}`
                            else
                                movedFromSq = `${colToLetter(moved.moveCol-1)}${moved.moveRow}`
                        }
                        else {
                            if (board.board[7-moved.moveRow+1][moved.moveCol-1].piece=="p")
                                movedFromSq = `${colToLetter(moved.moveCol-1)}${7-moved.moveRow+1}`
                            else
                                movedFromSq = `${colToLetter(moved.moveCol+1)}${7-moved.moveRow+1}`
                        }
                    } else {
                        
                    }
                } else {
                    if (moved.pawnCouldMovedFromSecondRow) {
                        if (moved.color==="w") {
                            if (board.board[7-moved.moveRow+2][moved.moveCol+1].piece=="P")
                                movedFromSq = `${colToLetter(moved.moveCol+1)}${moved.moveRow-1}`
                            else
                                movedFromSq = `${colToLetter(moved.moveCol+1)}${moved.moveRow}`
                        }
                        else {
                            if (board.board[7-moved.moveRow-2][moved.moveCol+1].piece=="p")
                                movedFromSq = `${colToLetter(moved.moveCol+1)}${7-moved.moveRow-1}`
                            else
                                movedFromSq = `${colToLetter(moved.moveCol+1)}${7-moved.moveRow}`
                        }
                    } else {
                        if (moved.color==="w") {
                            movedFromSq = `${colToLetter(moved.moveCol+1)}${7-moved.moveRow+1}`
                        }
                        else {
                            movedFromSq = `${colToLetter(moved.moveCol+1)}${7-moved.moveRow}`
                        }
                    }
                }

                break
            }
            case "n": {
                break
            }
            case "b": {
                break
            }
            case "r": {
                break
            }
            case "q": {
                break
            }
            case "k": {
                break
            }
        }

        return movedFromSq
    }

    pgnToFen(move) {
        let board = new BoardClass("rnbqkbnr/1ppppppp/8/p3P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2")

        for (let i=0; i<move; i++) {
            //this.pgn[Math.floor(i/2)][i%2]
        }
        console.log(this.pgn)
        console.log(board)
        //console.log(this.pgn.slice(-1)[0][1])
        console.log(this.movedFrom(this.pgn.slice(-1)[0][1], board))
    }
}