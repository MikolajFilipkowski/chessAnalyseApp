import React from 'react'
import Piece from './Piece'
import colToLetter from '../funcs/ColToLetter'

export default function Square({sqRow, sqCol, piece}) {
    let sqName = `${colToLetter(sqCol)}${sqRow+1}`
    let color = ((sqCol+sqRow)%2==1) ? "white" : "black"

    return (
        <div className={`square ${color}Sq`}><Piece pieceFen={piece}/></div>
    )
}
