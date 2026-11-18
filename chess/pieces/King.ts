import { Piece, type Color, type Position } from "./Piece";

const kingOffsets: Position[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export class King extends Piece {
  readonly type = "K";
  constructor(color: Color) {
    super(color);
  }
  protected getOffsets() {
    return kingOffsets;
  }
  protected isSliding() {
    return false;
  }
}
