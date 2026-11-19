import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { BOARD_SIZE, BoardView, Color, Piece, Position } from "./pieces/Piece";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";

export class Board implements BoardView {
  private squares: (Piece | null)[][];

  constructor() {
    this.squares = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(null),
    );
  }

  isInside([r, c]: Position) {
    return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
  }

  getPiece([r, c]: Position) {
    return this.isInside([r, c]) ? this.squares[r][c] : null;
  }

  placePiece(piece: Piece, [r, c]: Position): void {
    this.squares[r][c] = piece;
  }

  removePiece([r, c]: Position): void {
    this.squares[r][c] = null;
  }

  // Raw move, no legality check
  movePiece(from: Position, to: Position) {
    this.squares[to[0]][to[1]] = this.squares[from[0]][from[1]];
    this.squares[from[0]][from[1]] = null;
  }

  movesFor(from: Position) {
    const piece = this.getPiece(from);
    return piece ? piece.possibleMoves(this, from) : [];
  }

  findKing(color: Color): Position | null {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const p = this.squares[r][c];
        if (p instanceof King && p.getColor() === color) return [r, c];
      }
    }
    return null;
  }

  clone() {
    const copy = new Board();
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        copy.squares[r][c] = this.squares[r][c];
      }
    }
    return copy;
  }

  setupInitialPosition() {
    const backRank: Array<new (c: Color) => Piece> = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook,
    ];

    for (let c = 0; c < BOARD_SIZE; c++) {
      this.squares[0][c] = new backRank[c]("black");
      this.squares[1][c] = new Pawn("black");
      this.squares[6][c] = new Pawn("white");
      this.squares[7][c] = new backRank[c]("white");
    }
  }
}
