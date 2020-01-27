import React, { useState } from "react";
import Tile from "./Tiles";
import styles from "./board.css";
import Checker from "./Checker";

const SIZE = 8;

const initialBoard = (function buildBoard(dimension = SIZE) {
  const board = [];
  let shift = 0;
  for (let i = 0; i < SIZE * SIZE; i++) {
    if (i % SIZE === 0) {
      shift += 1;
    }
    const isDark = (i + shift) % 2 === 0;
    let checker = null;
    if (isDark) {
      if (i < 16) {
        checker = "dark";
      } else if (i > 47) {
        checker = "light";
      }
    }
    board.push({
      isDark,
      checker,
      canMoveHere: false
    });
  }
  return board;
})();

function getPotentiallyAvailableTiles(pos, type) {
  let positions = [null, null, null, null];
  if (type === "dark") {
    if (pos % 8 === 0) {
      // left corner
      positions[0] = pos + 9;
    } else if (pos % 8 === 7) {
      // right corner
      positions[0] = pos + 7;
    } else {
      positions[0] = pos + 7;
      positions[1] = pos + 9;
    }
  } else if (type === "light") {
    if (pos % 8 === 0) {
      // left corner
      positions[0] = pos - 7;
    } else if (pos % 8 === 7) {
      // right corner
      positions[0] = pos - 9;
    } else {
      positions[0] = pos - 7;
      positions[1] = pos - 9;
    }
  }
  return positions;
}

function getAvailablePositions(board, positions) {
  return positions.filter(p => {
    return board[p] && board[p].checker === null;
  });
}

function highlightBoard(board, availablePositions) {
  return board.map((b, i) => {
    if (availablePositions.includes(i)) {
      return {
        ...b,
        canMoveHere: true
      };
    }
    return {
      ...b,
      canMoveHere: false
    };
  });
}

export default function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [activeChecker, setActiveChecker] = useState({});
  const [availablePositions, setAvailablePositions] = useState([]);
  return (
    <div className="board">
      {board.map((tile, i) => {
        return (
          <Tile
            isDark={tile.isDark}
            canMoveHere={tile.canMoveHere}
            onClick={() => {
              if (availablePositions.includes(i)) {
                setBoard(
                  board.map((b, index) => {
                    if (index === i) {
                      return {
                        ...b,
                        checker: activeChecker.type,
                        canMoveHere: false
                      };
                    }
                    if (index === activeChecker.i) {
                      return {
                        ...b,
                        checker: null,
                        canMoveHere: false
                      };
                    }
                    return {
                      ...b,
                      canMoveHere: false
                    };
                  })
                );
              }
            }}
          >
            {/* <span>{i}</span> */}
            {tile.checker !== null ? (
              <Checker
                isDark={tile.checker === "dark"}
                onClick={() => {
                  setActiveChecker({
                    type: tile.checker,
                    i
                  });

                  const potentiallyAvailablePositions = getPotentiallyAvailableTiles(
                    i,
                    tile.checker
                  );
                  const availablePositions = getAvailablePositions(
                    board,
                    potentiallyAvailablePositions
                  );

                  const highlightedBoard = highlightBoard(
                    board,
                    availablePositions
                  );

                  setAvailablePositions(availablePositions);
                  setBoard(highlightedBoard);
                }}
              />
            ) : null}
          </Tile>
        );
      })}
    </div>
  );
}
