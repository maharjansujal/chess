import { Knight } from "./pieces/Knight";
import { Piece, Position } from "./pieces/Piece";

export class Board {
  private squares: (Piece | null)[][];

  constructor() {
    this.squares = Array.from({ length: 8 }, () => Array(8).fill(null));
  }

  getPiece(position: Position) {
    const [row, col] = position;
    return this.squares[row][col];
  }

  placePiece(piece: Piece, position: Position) {
    const [row, col] = position;
    this.squares[row][col] = piece;
  }

  movePiece(from: Position, to: Position) {
    const piece = this.getPiece(from);
    if (!piece) return;
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    this.squares[fromX][fromY] = null;
    this.squares[toX][toY] = piece;
  }
}

const board = new Board();

board.placePiece(new Knight("white"), [7, 1]);

console.log(board.getPiece([7, 1]));
