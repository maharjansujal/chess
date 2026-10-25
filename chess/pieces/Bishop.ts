import { Color, Piece, Position } from "./Piece";

export const bishopOffsets: Position[] = indices.flatMap((i) => [
  [i, i],
  [-i, -i],
  [i, -i],
  [-i, i],
]);

export class Bishop extends Piece {
  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(position: Position): Position[] {
    return this.possibleMoves(bishopOffsets, position);
  }

  getColor(): Color {
    return this.color;
  }
}
