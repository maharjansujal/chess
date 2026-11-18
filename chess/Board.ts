import { BOARD_SIZE, BoardView, Piece, Position } from "./pieces/Piece";

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
}
