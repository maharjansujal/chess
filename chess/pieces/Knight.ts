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

  getPossibleMoves(position: Position): Position[] {
    return this.possibleMoves(knightOffsets, position);
  }

  getColor(): Color {
    return this.color;
  }
}
