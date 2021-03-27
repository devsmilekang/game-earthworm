import { closeSync } from 'node:fs';
import React, { useEffect, useRef, useState } from 'react';
import WarmCell from '../components/WarmCell';
import '../style.scss';

interface GameBoardProps {
    gameBoardSize: number;
}
interface Cell {
    id: number;
    top: number;
    left: number;
}
enum Direction{
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT = 39
}
const GameBoard: React.FC<GameBoardProps> = ({ gameBoardSize }) => {
    let cellsId = 0;
    const CELLSIZE = 10;
    const [gameStatus, setGameStatus] = useState<boolean>(false);
    const [direction, _setDirection] = useState<Direction>(Direction.RIGHT);
    const [cells, _setCells] = useState<Cell[]>([startWarmPosition()]);
    const cellsRef = useRef(cells);
    const intervalEventRef = useRef<any>();
    const directionRef = useRef(direction);
    const [index, setIndex] = useState<number>(0);
    function setCells(data: Cell[]) {
        cellsRef.current = [...data];
        _setCells(data);
    }
    function setDirection(e:any){
        if (e.keyCode === 38) {   // up
            directionRef.current = Direction.UP;
            _setDirection(Direction.UP);
        }
        else if (e.keyCode === 40) {  //down
            directionRef.current = Direction.DOWN;
            _setDirection(Direction.DOWN);
        }
        else if (e.keyCode === 37) {  //left
            directionRef.current = Direction.LEFT;
            _setDirection(Direction.LEFT);
        }
        else if (e.keyCode === 39) {  //right
            directionRef.current = Direction.RIGHT;
            _setDirection(Direction.RIGHT);
        }
    }
    function move() {
        let top = 0;
        let left = 0;
        const copy = [...cellsRef.current];
        if (directionRef.current === Direction.UP) {   // up
            top -= 1;
        }
        else if (directionRef.current === Direction.DOWN) {  //down
            top += 1;
        }
        else if (directionRef.current === Direction.LEFT) {  //left
            left -= 1;
        }
        else if (directionRef.current === Direction.RIGHT) {  //right
            left += 1;
        }
        if(isEnd(copy[copy.length - 1].top + top * CELLSIZE, copy[copy.length - 1].left + left * CELLSIZE)){
            setGameStatus(false);
            return;
        }
        copy?.push({
            id: ++cellsId,
            top: copy[copy.length - 1].top + top * CELLSIZE,
            left: copy[copy.length - 1].left + left * CELLSIZE
        });
        setCells(copy);
    }

    function startWarmPosition() : Cell{
        return ({id:0, top:Number(gameBoardSize/2)*CELLSIZE, left:Number(gameBoardSize/2)*CELLSIZE})
    }

    function isEnd(top:number, left:number) : Boolean{
        if(isOutOfLine(top,left)){    // 밖으로 나간 경우
            return true;
        }
        return false;
    }

    function isOutOfLine(top:number, left:number): Boolean{
        if(
            top < 0 
            || top >= gameBoardSize * CELLSIZE
            || left < 0 
            || left >= gameBoardSize * CELLSIZE
        ){
            return true;
        }
        return false;
    }
    
    function gameStartStop(gameStatus:boolean){
        if(gameStatus){ //start
            setCells([startWarmPosition()]);
            intervalEventRef.current = setInterval(move, 100);
        }
        else{
            clearInterval(intervalEventRef.current);
        }
    }

    useEffect(() => {
        document.body.addEventListener("keydown", setDirection);
    }, []);
    useEffect(()=>{
        gameStartStop(gameStatus);
    }, [gameStatus]);
    return (
        <>
            <div className={`board-${gameBoardSize}`}>
                {cells?.map(warm => <WarmCell key={warm.id} {...warm} />)}
                {!gameStatus && <div className={'modal'}>
                    <p>gameOver</p>
                </div>}
            </div>
            <button onClick={() => setGameStatus(!gameStatus)}>{gameStatus ? 'stop' :'start'}</button>
            
        </>
    )

}


export default GameBoard;