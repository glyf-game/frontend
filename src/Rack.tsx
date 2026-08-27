import "./Rack.css";

export interface Tile {
  id: number;
  letter: string;
}

interface RackProps {
  tiles: Tile[];
}

export default function Rack({ tiles }: RackProps) {
  return (
    <div className="rack">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className="tile"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", tile.letter);
            e.dataTransfer.setData("text/tile-id", String(tile.id));
          }}
        >
          {tile.letter}
        </div>
      ))}
    </div>
  );
}