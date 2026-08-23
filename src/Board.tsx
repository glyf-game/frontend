import "./Board.css";

const BOARD_SIZE = 15;

export default function Board() {
  const boardCells = Array.from({ length: BOARD_SIZE * BOARD_SIZE });

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
      }}
    >
      {boardCells.map((_, i) => (
        <div key={i} className="cell" />
      ))}
    </div>
  );
}