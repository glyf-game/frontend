import { useState } from "react";
import Board from "./Board";
import Rack, { type Tile } from "./Rack";
import "./App.css";

const RACKS: string[][] = [
  ["I", "M", "A", "D", "I", "V", "A"],
  ["H", "E", "L", "P", "M", "E", "E"],
  ["W", "A", "S", "S", "U", "U", "P"],
  ["I", "O", "N", "N", "O", "T", "F"],
];

function buildTiles(letters: string[]): Tile[] {
  return letters.map((letter, i) => ({ id: i, letter }));
}

export default function App() {
  const [rackIndex, setRackIndex] = useState(0);
  const [rackTiles, setRackTiles] = useState<Tile[]>(buildTiles(RACKS[0]));
  const [placedLetters, setPlacedLetters] = useState<Record<number, string>>({});

  function handleTileDrop(cellIndex: number, tileId: number, letter: string) {
    if (placedLetters[cellIndex]) return;

    setPlacedLetters((prev) => ({ ...prev, [cellIndex]: letter }));
    setRackTiles((prev) => prev.filter((tile) => tile.id !== tileId));
  }

  function handleSwitchRack() {
    const nextIndex = (rackIndex + 1) % RACKS.length;
    setRackIndex(nextIndex);
    setRackTiles(buildTiles(RACKS[nextIndex]));
  }

  return (
    <div className="app">
      <Board placedLetters={placedLetters} onTileDrop={handleTileDrop} />
      <div className="rack-row">
        <Rack tiles={rackTiles} />
        <button onClick={handleSwitchRack}>Switch Rack</button>
      </div>
    </div>
  );
}