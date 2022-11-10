import React from "react";
import './App.css';

function App() {

  const [boards, setBoards] = React.useState([
    {id: 1, title: 'Todo', items: [{id:1, title: 'Designing'}, {id: 2, title: 'Change Color'}, {id: 3, title: 'Make Testing'}]},
    {id: 2, title: 'Test', items: [{id:4, title: 'Creating Menu'}, {id: 5, title: 'Creating Search'}, {id: 6, title: 'Create button'}]},
    {id: 3, title: 'Done', items: [{id:7, title: 'Fetching Data'}, {id: 8, title: 'Filtering Data'}, {id: 9, title: 'Adding New data'}]},
  ])

  const [ currentBoard, setCurrentBoard ] = React.useState(null)
  const [ currentItem, setCurrentItem ] = React.useState(null)

  function dragOverHandler(e) {
    e.preventDefault()
    if(e.target.className == 'item'){
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }

  function ondragleaveHandler(e) {
    e.target.style.boxShadow = 'none'

  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    e.target.style.boxShadow = 'none'
  }

  function dropCardHandler(e, board) {
    e.preventDefault();
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }

  return (
    <div className="app">
      {boards.map(board =>
        <div
            className="board"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className="board__title">{board.title}</div>
          {board.items.map(item =>
            <div
                className="item"
                draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={e => ondragleaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
