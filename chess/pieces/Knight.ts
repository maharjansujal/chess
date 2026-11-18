import { type Color, Piece, Position } from "./Piece";
const knightOffsets: Position[] = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

export class Knight extends Piece {
  readonly type = "N";
  constructor(color: Color) {
    super(color);
  }
  protected getOffsets() {
    return knightOffsets;
  }
  protected isSliding() {
    return false;
  }
}
