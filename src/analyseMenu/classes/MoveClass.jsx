import PieceClass from "../../board/classes/PieceClass"
import letterToCol from "../../funcs/LetterToCol"

export default class MoveClass {
    constructor(move, color) {
        this.move = move
        this.color = color
        this.isCapture = false
        this.isCheck = false
        this.isKingsideCastle = false
        this.isQueensideCastle = false
        this.moveToSquare = ""
        this.piece = ""
        this.multiplePieces = ""
        this.pawnCouldMovedFromSecondRow = false
        this.moveRow = null
        this.moveCol = null

        this.ProcessMove(move, color)
    }

    ProcessMove(move, color) {
        this.isCapture = move.includes("x")
        this.isCheck = move.includes("+")
        this.isKingsideCastle = move === "O-O"
        this.isQueensideCastle = move === "O-O-O"
        let moveWithoutSings = move.replaceAll("+", "").replaceAll("#", "").replaceAll("x", "")

        if (move[0]==="O") {
            this.piece = color==="w" ? new PieceClass("K") : new PieceClass("k")
            if (color==="w") {
                this.moveToSquare = moveWithoutSings.length==3 ? "g1" : "c1"
                this.moveRow = 0
                this.moveCol = moveWithoutSings.length==3 ? 6 : 2
            }
            else {
                this.moveToSquare = moveWithoutSings.length==3 ? "g8" : "c8"
                this.moveRow = 7
                this.moveCol = moveWithoutSings.length==3 ? 6 : 2
            }
        }
        else if (move[0].toUpperCase()!==move[0]) {
            this.piece = color==="w" ? new PieceClass("P") : new PieceClass("p")
            if (moveWithoutSings.length<=2) {
                this.moveToSquaremove = moveWithoutSings
                if (color==="w" && (moveWithoutSings[1]=="3" || moveWithoutSings[1]=="4")) this.pawnCouldMovedFromSecondRow = true
                else if (color==="b" && (moveWithoutSings[1]=="5" || moveWithoutSings[1]=="6")) this.pawnCouldMovedFromSecondRow = true

                this.moveRow = parseInt(moveWithoutSings[1])-1
            }
            else if (this.isCapture) {
                this.moveToSquare = moveWithoutSings[1] + moveWithoutSings[2]
                this.moveRow = parseInt(moveWithoutSings[2])-1
            }
            else {
                this.moveToSquare = moveWithoutSings[0] + moveWithoutSings[2]
                this.multiplePieces = moveWithoutSings[1]
                this.moveRow = parseInt(moveWithoutSings[2])-1
            }

            this.moveCol = parseInt(letterToCol(moveWithoutSings[0]))-1
        }
        else {
            this.piece = color==="w" ? new PieceClass(move[0]) : new PieceClass(move[0])
            if (moveWithoutSings.length<=3) {
                this.moveToSquaremove = moveWithoutSings
                this.moveRow = parseInt(moveWithoutSings[3])-1
            }
            else {
                this.moveToSquare = moveWithoutSings[2] + moveWithoutSings[3]
                this.multiplePieces = moveWithoutSings[1]
                this.moveRow = parseInt(moveWithoutSings[3])-1
            }

            this.moveCol = parseInt(letterToCol(moveWithoutSings[2]))-1
        }


    }
}