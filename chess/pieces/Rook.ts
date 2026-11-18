import { Piece, type Color, type Position } from "./Piece";

const rookOffsets: Position[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export class Rook extends Piece {
  readonly type = "R";
  constructor(color: Color) {
    super(color);
  }
  protected getOffsets() {
    return rookOffsets;
  }
  protected isSliding() {
    return true;
  }
}
