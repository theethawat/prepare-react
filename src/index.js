import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
        return (
            <button className="square" 
            onClick={()=>props.onClick()}>
              {props.value}
            </button>
          );
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        squares: Array(9).fill(null),
        xIsNext:true,
      }
    }
      //เป็นการสร้างฟังก์ชันฟังก์ชั่นหนึ่ง
    renderSquare(i) {
      return <Square value={this.state.squares[i]}
      onClick={()=>this.handleClick(i)}/>;
    }
    
    handleClick(i){
      const fnsquares = this.state.squares.slice();
      if(calculteWinner(fnsquares)||fnsquares[i]){
        return;
      }
      fnsquares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares:fnsquares,
        xIsNext:!this.state.xIsNext,
      });
    }

    render() {
      const winner = calculteWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner:' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
      }
      
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  function calculteWinner(squares){
    const lines =[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0 ; i < lines.length;i++){
      //ถ้าผลสามตัวติดกันเป็นอันใดอันหนึ่ง แล้ว square a b c เป็นเครื่องหมายเดียวกัน X , O เดียวกัน ก็ declare a winner 
      const [a,b,c] = lines[i];
      if(squares [a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
