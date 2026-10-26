import { bishopOffsets } from "./Bishop";
import { Color, Piece, Position } from "./Piece";
import { rookOffSets } from "./Rook";

const queenOffsets = [...rookOffSets, ...bishopOffsets];

export class Bishop extends Piece {
  constructor(color: Color) {
    super(color);
  }

  protected getOffsets() {
    return queenOffsets;
  }

  getColor(): Color {
    return this.color;
  }
}
