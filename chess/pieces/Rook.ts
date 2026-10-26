import { Color, Piece, Position } from "./Piece";

export const rookOffSets: Position[] = indices.flatMap((i) => [
  [0, i],
  [0, -i],
  [i, 0],
  [-i, 0],
]);

export class Rook extends Piece {
  constructor(color: Color) {
    super(color);
  }

  protected getOffsets() {
    return rookOffSets;
  }

  getColor(): Color {
    return this.color;
  }
}
