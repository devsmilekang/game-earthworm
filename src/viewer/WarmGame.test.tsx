import '@testing-library/jest-dom/extend-expect';
import reducers, { selectGameSize } from '../slice/WarmGameSlice';

describe('warmGame actions', () => {
  it('should set gameBoardSize', () => {
    const state = {
      gameBoardSize: 40,
    };
    const action = {
      type: 'setGameBoardSize',
      payload: '20',
    };
    const result = reducers(state, action);
    expect(result).toEqual(state);
  });
  it('should return state gameBoardSize', () => {
    const state = {
      WarmGame: { gameBoardSize: 30 },
    };
    const action = {
      type: 'WarmGame/setGameBoardSize',
      payload: '20',
    };
    const result = selectGameSize(state);
    expect(result).toEqual(state.WarmGame.gameBoardSize);
  });

  // it('<GameBoard /> 컴포넌트를 그린다.', () => {
  //   render(<GameBoard />);
  //   expect(screen.getByTestId('board'));
  // });
  // it(`start 버튼 클릭시 버튼 텍스트가 stop 으로 바뀐다.`, () => {
  //   render(<GameBoard />);
  //   const button = screen.getByTestId('game-progress-button');
  //   fireEvent.click(button);
  //   expect(button).toHaveTextContent('stop');
  // });
  // it('게임을 실행 한 후 move 함수가 호출된다.', () => {
  //   const move = jest.fn();
  //   render(<GameBoard gameBoardSize={30} />);
  //   const button = screen.getByTestId('game-progress-button');
  //   fireEvent.click(button);
  //   expect(move).toBeCalled();
  //   expect(move).toBeCalledTimes(1);
  // });
});

// import React from 'react';
// import { getByTestId, render, screen } from '@testing-library/react';
// import GameBoard from './GameBoard';
// import { act } from 'react-dom/test-utils';

// describe('<GameBoard />', function () {
//   it('should render GameBoard', function () {
//     let container = document.createElement('div');
//     document.body.appendChild(container);
//     act(() => {
//       render(<GameBoard gameBoardSize={50} />, container);
//     });
//     expect(getByTestId(container, 'board')).toBeInTheDocument();
//     // act(() => {
//     //   render(<GameBoard gameBoardSize={50} />, container);
//     // });
//     // expect()
//     // expect(getByTestId(container, 'board')).toBeInTheDocument();
//   });
// });
