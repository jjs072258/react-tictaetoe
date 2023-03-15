import React from 'react';
import './Square.css';

// export default : 이 클래스 메인으로 밖으로 내보낸다.
const Square = ({ onClick, value }) => {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;

// const Square = (props) => {
//   return (
//     <button className='square' onClick={() => props.onClick()}>
//       {props.value}
//     </button>
//   );
// };
