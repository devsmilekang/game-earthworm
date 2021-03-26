import { closeSync } from 'node:fs';
import React, { useEffect, useRef, useState } from 'react';
import WarmCell from '../components/WarmCell';
import '../style.scss';

interface GameBoardProps{
    size: number;
}
interface Cell{
    id:number;
    top:number;
    left:number;
}
const GameBoard: React.FC<GameBoardProps>= ({size}) =>{
    let cellsId = 0;
    const CELLSIZE = 10;
    const [cells, _setCells] = useState<Cell[]>([
        {id:0, top:0*CELLSIZE,left:0*CELLSIZE}
    ]);
    const cellsRef = useRef(cells);
    const [index, setIndex] = useState<number>(0);
    // function makeWarmCell(index:number, warm:Cell[]) : React.ReactNode[]{
    //     const array = [];
    //     for(let i=index; i<warm.length; i++){
    //         array.push(<WarmCell key={i} {...warm[i]} />);
    //     }
    //     return array;
    // }
    function setCells(data:Cell[]){
        cellsRef.current = [...data];
        _setCells(data);
    }
    function move(e:any){
        let top = 0;
        let left = 0;
        const copy = [...cellsRef.current];
        if(e.keyCode === 38){   // up
            top -= 1;
        }
        else if(e.keyCode === 40){  //down
            top += 1;
        }
        else if(e.keyCode === 37){  //left
            left -= 1;
        }
        else if(e.keyCode === 39){  //right
            left += 1;
        }
        copy?.push({
            id:++cellsId,
            top:copy[copy.length-1].top+top*CELLSIZE,
            left:copy[copy.length-1].left+left*CELLSIZE
        });
        setCells(copy);
    }
    useEffect(()=>{
        document.body.addEventListener("keydown", (e) =>{
            move(e)
        });
    },[]);
    return <div className={`board-${size}`}>
        {cells?.map(warm => <WarmCell key={warm.id} {...warm} />)}
    </div>
    
}


export default GameBoard;