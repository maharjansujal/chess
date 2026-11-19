import { BoardView, Color, Piece, Position } from "./Piece";

export class Pawn extends Piece {
  readonly type = "P";
  constructor(color: Color) {
    super(color);
  }

  protected getOffsets(): Position[] {
    return []; // returning [] is just satisfying the abstract contract
  }
  protected isSliding() {
    return false;
  }

  private get direction(): number {
    return this.color === "white" ? -1 : 1;
  }

  private get startRow(): number {
    return this.color === "white" ? 6 : 1;
  }

  possibleMoves(board: BoardView, from: Position) {
    const [row, col] = from;
    const dir = this.direction;
    const moves: Position[] = [];

    // 1-step
    const oneFwd: Position = [row + dir, col];

    if (board.isInside(oneFwd) && board.getPiece(oneFwd) === null) {
      moves.push(oneFwd);

      // 2-step forward
      if (row === this.startRow) {
        const twoFwd: Position = [row + 2 * dir, col];
        if (board.getPiece(twoFwd) === null) moves.push(twoFwd);
      }
    }

    // Diagonal capture
    for (const dc of [-1, 1]) {
      const target: Position = [row + dir, col + dc];
      if (!board.isInside(target)) continue;
      if (this.isEnemy(board.getPiece(target))) moves.push(target);
    }

    return moves;
  }
}
