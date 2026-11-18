import { Color, Piece, Position } from "./Piece";

const bishopOffsets: Position[] = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export class Bishop extends Piece {
  readonly type = "B";
  constructor(color: Color) {
    super(color);
  }
  protected getOffsets() {
    return bishopOffsets;
  }
  protected isSliding() {
    return true;
  }
}
