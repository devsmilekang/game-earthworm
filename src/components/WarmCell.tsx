import React from 'react';
// import '../style.scss'

interface WarmCellProps {
  id: number;
  top: number;
  left: number;
  type?: string;
}

const WarmCell: React.FC<WarmCellProps> = ({ top, left, type }) => {
  return (
    <div
      className={`WarmCell ${type}`}
      style={{ top: `${top + 'px'}`, left: `${left + 'px'}` }}
    ></div>
  );
};

export default WarmCell;
