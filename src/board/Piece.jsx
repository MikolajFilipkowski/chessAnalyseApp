import React from 'react'
import PieceClass from './classes/PieceClass'

function pieceToImg(pieceFen) {
    let pieceArray = {
        "p":"pawn",
        "r":"rook",
        "n":"knight",
        "b":"bishop",
        "q":"queen",
        "k":"king"
    }
    return `${pieceFen.toLowerCase()===pieceFen ? "black" : "white"}_${pieceArray[pieceFen.toLowerCase()]}.svg`
}

export default function Piece({pieceFen}) {
    let piece=new PieceClass(pieceFen)

    return (
        <span style={{"color":piece.color==0 ? "#777777" : "black"}}>
            {piece.piece===null ? "" : 
            <img className="pieceImg" src={`/pieces/${pieceToImg(pieceFen)}`}/>
            }
        </span>
    )
}
