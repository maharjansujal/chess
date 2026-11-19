"use client";

import { Game, GameStatus } from "@/chess/Game";
import { Position } from "@/chess/pieces/Piece";
import { useState } from "react";

const GLYPHS: Record<string, string> = {
  K: "♚",
  Q: "♛",
  R: "♜",
  B: "♝",
  N: "♞",
  P: "♟",
};

const PIECE_NAMES: Record<string, string> = {
  K: "king",
  Q: "queen",
  R: "rook",
  B: "bishop",
  N: "knight",
  P: "pawn",
};

function getPieceImage(color: "white" | "black", type: string): string {
  const name = PIECE_NAMES[type] || "pawn";
  return `/pieces/${color}_${name}.png`;
}

const pieceGlyph = (type: string, color: "white" | "black") =>
  GLYPHS[type] ?? "?";

export default function Home() {
  const [game, setGame] = useState<Game>(() => new Game());
  const [selected, setSelected] = useState<Position | null>(null);
  const [legalMoves, setLegalMoves] = useState<Position[]>([]);
  const [lastMove, setLastMove] = useState<[Position, Position] | null>(null);

  const refresh = (g: Game) =>
    setGame(Object.assign(Object.create(Object.getPrototypeOf(g)), g));

  const status = game.status();

  function handleClick(pos: Position) {
    if (selected) {
      const isDest = legalMoves.some(([r, c]) => r === pos[0] && c === pos[1]);
      if (isDest) {
        const result = game.makeMove(selected, pos);
        if (result.ok) {
          setLastMove([selected, pos]);
          setSelected(null);
          setLegalMoves([]);
          refresh(game);
          return;
        }
      }
    }
    const piece = game.board.getPiece(pos);
    if (piece && piece.getColor() === game.turn) {
      setSelected(pos);
      setLegalMoves(game.legalMovesFor(pos));
    } else {
      setSelected(null);
      setLegalMoves([]);
    }
  }

  const isMoveTarget = ([r, c]: Position) =>
    legalMoves.some(([lr, lc]) => lr === r && lc === c);

  const isSelected = ([r, c]: Position) =>
    selected !== null && selected[0] === r && selected[1] === c;

  const isLast = ([r, c]: Position) =>
    lastMove !== null &&
    ((lastMove[0][0] === r && lastMove[0][1] === c) ||
      (lastMove[1][0] === r && lastMove[1][1] === c));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-semibold">Chess — 1v1 Local</h1>
      <StatusBar status={status} turn={game.turn} />

      <div className="grid grid-cols-8 border-2 border-zinc-700 rounded overflow-hidden shadow-xl">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => {
            const pos: Position = [r, c];
            const piece = game.board.getPiece(pos);
            const dark = (r + c) % 2 === 1;

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleClick(pos)}
                className={[
                  "relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none transition-colors",
                  dark ? "bg-amber-800" : "bg-amber-200",
                  isSelected(pos) ? "ring-4 ring-blue-500 ring-inset" : "",
                  isLast(pos) ? "ring-2 ring-yellow-400 ring-inset" : "",
                  isMoveTarget(pos) ? "hover:bg-emerald-400/70" : "",
                ].join(" ")}
              >
                {piece && (
                  <img
                    src={getPieceImage(piece.getColor(), piece.type)}
                    alt={`${piece.getColor()} ${piece.type}`}
                    className="w-full h-full drop-shadow-md"
                    draggable={false}
                  />
                )}

                {/* The green dot for empty move targets */}
                {!piece && isMoveTarget(pos) && (
                  <span className="absolute w-6 h-6 rounded-full bg-emerald-500/70" />
                )}
              </button>
            );
          }),
        )}
      </div>

      <p className="text-sm text-zinc-400">
        Click a piece, then a highlighted square to move.
      </p>
    </main>
  );
}

function StatusBar({
  status,
  turn,
}: {
  status: GameStatus;
  turn: "white" | "black";
}) {
  let text = "";
  let tone = "text-zinc-300";

  switch (status.kind) {
    case "playing":
      text = `${capitalize(turn)} to move`;
      break;
    case "check":
      text = `${capitalize(status.color)} is in check!`;
      tone = "text-red-400 font-semibold";
      break;
    case "checkmate":
      text = `Checkmate! ${capitalize(status.winner)} wins 🎉`;
      tone = "text-emerald-400 font-bold";
      break;
    case "stalemate":
      text = "Stalemate — draw";
      tone = "text-yellow-400 font-semibold";
      break;
  }

  return <div className={`text-lg ${tone}`}>{text}</div>;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
