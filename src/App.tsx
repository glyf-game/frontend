import React from "react";
import "./App.css";

/**
 * Layout-only shell for a Glyf board. This maps out the
 * board grid, stripped of game logic and configuration
 */

// ---------------------------------------------------------------------------
// Config: replace these with real state/props in later stages
// ---------------------------------------------------------------------------

const BOARD_SIZE = 15; // standard Scrabble board is 15x15
const CENTER_INDEX = Math.floor(BOARD_SIZE / 2);

const PLAYER_COUNT = 2; // number of player slots to render in the scoreboard
const RACK_SIZE = 7; // number of tile slots on a player's rack

const TILES_REMAINING_PLACEHOLDER = 0; // swap with real bag count from game state

// ---------------------------------------------------------------------------
// Board layout — premium square positions, structural 
// ---------------------------------------------------------------------------


type CellType = "normal" | "tw" | "dw" | "tl" | "dl" | "center"; // tpye alias

const TRIPLE_WORD: Array<[number, number]> = [
  [0, 0], [0, 7], [0, 14],
  [7, 0], [7, 14],
  [14, 0], [14, 7], [14, 14],
];

const DOUBLE_WORD: Array<[number, number]> = [
  [1, 1], [2, 2], [3, 3], [4, 4],
  [1, 13], [2, 12], [3, 11], [4, 10],
  [13, 1], [12, 2], [11, 3], [10, 4],
  [13, 13], [12, 12], [11, 11], [10, 10],
];

const TRIPLE_LETTER: Array<[number, number]> = [
  [1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13],
  [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9],
];

const DOUBLE_LETTER: Array<[number, number]> = [
  [0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14],
  [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11],
  [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14],
  [12, 6], [12, 8], [14, 3], [14, 11],
];

function has(list: Array<[number, number]>, r: number, c: number): boolean {
  return list.some(([lr, lc]) => lr === r && lc === c);
}

function getCellType(r: number, c: number): CellType {
  if (r === CENTER_INDEX && c === CENTER_INDEX) return "center";
  if (has(TRIPLE_WORD, r, c)) return "tw";
  if (has(DOUBLE_WORD, r, c)) return "dw";
  if (has(TRIPLE_LETTER, r, c)) return "tl";
  if (has(DOUBLE_LETTER, r, c)) return "dl";
  return "normal";
}

const CELL_LABEL: Record<CellType, string> = {
  normal: "",
  tw: "TW",
  dw: "DW",
  tl: "TL",
  dl: "DL",
  center: "★",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function App(): React.JSX.Element {
  const boardCells = Array.from({ length: BOARD_SIZE * BOARD_SIZE });
  const rackSlots = Array.from({ length: RACK_SIZE });
  const playerSlots = Array.from({ length: PLAYER_COUNT });

  return (
    <div className="sgb-page">
      <div className="sgb-shell">
        {/* Header */}
        <header className="sgb-header">
          <div>
            <h1 className="sgb-title">Glyf</h1>
            <p className="sgb-subtitle">* made w/out élettapasztalat *</p>
          </div>
          <div className="sgb-bag-counter">
            <span className="sgb-bag-count">{TILES_REMAINING_PLACEHOLDER}</span>
            <span className="sgb-bag-label">tiles left in bag</span>
          </div>
        </header>

        <div className="sgb-main-area">
          {/* Board */}
          <div className="sgb-board-frame">
            <div
              className="sgb-board"
              style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
              }}
            >
              {boardCells.map((_, i) => {
                const r = Math.floor(i / BOARD_SIZE);
                const c = i % BOARD_SIZE;
                const type = getCellType(r, c);

                return (
                  <div key={`${r}-${c}`} className={`sgb-cell sgb-cell--${type}`}>
                    {type !== "normal" && (
                      <span className={`sgb-cell-label sgb-cell-label--${type}`}>
                        {CELL_LABEL[type]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rack */}
        <footer className="sgb-rack-bar">
          <div className="sgb-rack-label-group">
            <span className="sgb-rack-label">Your rack</span>
            <span className="sgb-rack-sublabel">Player 1</span>
          </div>

          <div className="sgb-rack">
            {rackSlots.map((_, i) => (
              <div key={i} className="sgb-tile sgb-tile--rack" />
            ))}
          </div>

          <div className="sgb-rack-actions">
            <button className="sgb-btn sgb-btn--ghost sgb-btn--small">
              Shuffle
            </button>
            <button className="sgb-btn sgb-btn--secondary sgb-btn--small">
              Clear
            </button>
          </div>
        </footer>

          {/* Sidebar */}
          <aside className="sgb-sidebar">

            <div className="sgb-panel">
              <h2 className="sgb-panel-title">Turn Actions</h2>
              <div className="sgb-action-stack">
                <button className="sgb-btn sgb-btn--primary sgb-btn--full">
                  Play Word
                </button>
                <button className="sgb-btn sgb-btn--secondary sgb-btn--full">
                  Exchange Tiles
                </button>
                <button className="sgb-btn sgb-btn--secondary sgb-btn--full">
                  Pass Turn
                </button>
                <button className="sgb-btn sgb-btn--ghost sgb-btn--full">
                  Recall Tiles
                </button>
              </div>
            </div>


            <div className="sgb-panel">
              <h2 className="sgb-panel-title">Scoreboard</h2>
              <div className="sgb-player-list">
                {playerSlots.map((_, i) => (
                  <div key={i} className="sgb-player-row">
                    <div className="sgb-player-name-group">
                      <span className="sgb-turn-dot" />
                      <span className="sgb-player-name">Player {i + 1}</span>
                    </div>
                    <span className="sgb-player-score">—</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
