import React from 'react';
import '../style.scss'

interface WarmCellProps{
    id:number;
    top:number;
    left:number;
}

const WarmCell :React.FC<WarmCellProps> = ({top, left}) =>{
    return <div className="WarmCell" style={{top:`${top+"px"}`, left:`${left+"px"}`}}></div>
}

export default WarmCell;