import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import GameBoard from './GameBoard';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe(' <GameBoard />', () => {
  test('render <GameBoard />', () => {
    render(<GameBoard gameBoardSize={50} />);
    expect(screen.getByTestId('board')).toBeInTheDocument();
  });
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
