import "./Board.css";

const BOARD_SIZE = 15;

interface BoardProps {
  placedLetters: Record<number, string>;
  onTileDrop: (cellIndex: number, tileId: number, letter: string) => void;
}

export default function Board({ placedLetters, onTileDrop }: BoardProps) {
  const boardCells = Array.from({ length: BOARD_SIZE * BOARD_SIZE });

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, cellIndex: number) {
    e.preventDefault();
    const letter = e.dataTransfer.getData("text/plain");
    const tileId = Number(e.dataTransfer.getData("text/tile-id"));
    if (!letter) return;
    onTileDrop(cellIndex, tileId, letter);
  }

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
      }}
    >
      {boardCells.map((_, i) => (
        <div
          key={i}
          className="cell"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i)}
        >
          {placedLetters[i]}
        </div>
      ))}
    </div>
  );
}