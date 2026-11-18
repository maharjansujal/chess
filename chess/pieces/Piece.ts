export type Color = "white" | "black";

export type Position = [number, number];

export const BOARD_SIZE = 8;

export interface BoardView {
  getPiece(pos: Position): Piece | null;
  isInside(pos: Position): boolean;
}

export abstract class Piece {
  constructor(protected color: Color) {}

  getColor(): Color {
    return this.color;
  }

  abstract readonly type: string;

  protected abstract getOffsets(): Position[];
  protected abstract isSliding(): boolean;

  possibleMoves(board: BoardView, from: Position) {
    const [row, col] = from;
    const offsets = this.getOffsets();
    const moves: Position[] = [];

    for (const [dr, dc] of offsets) {
      let r = row + dr;
      let c = col + dc;

      while (board.isInside([r, c])) {
        const target = board.getPiece([r, c]);

        if (target === null) {
          moves.push([r, c]);
        } else {
          if (target.getColor() !== this.color) moves.push([r, c]);
          break;
        }

        if (!this.isSliding()) break;

        r += dr;
        c += dc;
      }
    }
    return moves;
  }

  isEnemy(other: Piece | null): boolean {
    return other !== null && other.getColor() !== this.color;
  }
}
