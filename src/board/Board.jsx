import React from 'react'
import Square from './Square'
import colToLetter from '../funcs/ColToLetter'

export default function Board({board}) {

    return (
        <div className='board'>
        {
            board.board.map((row) => {
                return <div className='sqRow' key={row[0].squareRow}>{row.map((v) => 
                <Square 
                    sqRow={v.squareRow} 
                    sqCol={v.squareCol} 
                    piece={v.piece} 
                    key={`${colToLetter(v.squareCol)}${v.squareRow}`}
                    />)}
                </div>
            })
        }
        </div>
    )
}
