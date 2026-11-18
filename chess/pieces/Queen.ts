import { Piece, type Color, type Position } from "./Piece";

const queenOffsets: Position[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export class Queen extends Piece {
  readonly type = "Q";
  constructor(color: Color) {
    super(color);
  }
  protected getOffsets() {
    return queenOffsets;
  }
  protected isSliding() {
    return true;
  }
}
