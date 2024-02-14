export default class PieceClass {
    constructor(piece) {
        this.piece = piece===null ? null : piece.toLowerCase()
        this.color = piece===null ? null : +(this.piece!==piece)
    }
}