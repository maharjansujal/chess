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
  constructor(color: Color) {
    super(color);
  }

  protected getOffsets() {
    return knightOffsets;
  }

  getColor(): Color {
    return this.color;
  }
}
