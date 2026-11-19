import { Board } from "./Board";
import { Color, Position } from "./pieces/Piece";

export type GameStatus =
  | { kind: "playing" }
  | { kind: "check"; color: Color }
  | { kind: "checkmate"; winner: Color }
  | { kind: "stalemate" };

// export interface MoveResult {
//   ok: boolean;
//   reason?: string;
// }

export type MoveResult = { ok: true } | { ok: false; reason: string };

export class Game {
  board: Board;
  turn: Color;

  constructor() {
    this.board = new Board();
    this.board.setupInitialPosition();
    this.turn = "white";
  }

  status(): GameStatus {
    const inCheck = this.isInCheck(this.turn);
    const hasLegal = this.hasAnyLegalMove(this.turn);

    if (!hasLegal) {
      if (inCheck) {
        return {
          kind: "checkmate",
          winner: this.turn === "white" ? "black" : "white",
        };
      }
      return { kind: "stalemate" };
    }
    if (inCheck) return { kind: "check", color: this.turn };
    return { kind: "playing" };
  }

  //   Internals

  private isSquareAttacked(pos: Position, byColor: Color) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board.getPiece([r, c]);
        if (!p || p.getColor() !== byColor) continue;
        const attacks = p.possibleMoves(this.board, [r, c]);
        if (attacks.some(([ar, ac]) => ar === pos[0] && ac === pos[1])) {
          return true;
        }
      }
    }
    return false;
  }

  private isInCheck(color: Color) {
    const kingPos = this.board.findKing(color);
    if (!kingPos) return false;

    return this.isSquareAttacked(
      kingPos,
      color === "white" ? "black" : "white",
    );
  }

  private wouldLeaveKingInCheck(from: Position, to: Position, color: Color) {
    const boardSnapshot = this.board.clone();
    this.board.movePiece(from, to);
    const inCheck = this.isInCheck(color);
    this.board = boardSnapshot;
    return inCheck;
  }

  //   Legal moves for the piece at from
  legalMovesFor(from: Position) {
    const piece = this.board.getPiece(from);
    if (!piece) return [];
    if (piece.getColor() !== this.turn) return [];

    return this.board
      .movesFor(from)
      .filter((to) => !this.wouldLeaveKingInCheck(from, to, piece.getColor()));
  }

  makeMove(from: Position, to: Position): MoveResult {
    const piece = this.board.getPiece(from);
    if (!piece) return { ok: false, reason: "No piece there" };
    if (piece.getColor() !== this.turn)
      return { ok: false, reason: "Not your turn" };

    const legal = this.legalMovesFor(from);
    const isLegal = legal.some(([r, c]) => r === to[0] && c === to[1]);
    if (!isLegal) return { ok: false, reason: "Illegal move" };

    this.board.movePiece(from, to);
    this.turn = this.turn === "white" ? "black" : "white";
    return { ok: true };
  }

  private hasAnyLegalMove(color: Color): boolean {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board.getPiece([r, c]);
        if (!p || p.getColor() !== color) continue;

        const moves = this.board.movesFor([r, c]);
        for (const to of moves) {
          if (!this.wouldLeaveKingInCheck([r, c], to, color)) return true;
        }
      }
    }
    return false;
  }
}
