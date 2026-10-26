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

  protected getOffsets() {
    return bishopOffsets;
  }

  getColor(): Color {
    return this.color;
  }
}
