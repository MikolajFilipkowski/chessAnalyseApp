export default class SquareClass {
    constructor(squareCol, squareRow, piece=null) {
        this.squareCol = squareCol
        this.squareRow = 7-squareRow
        this.piece = piece
    }
}