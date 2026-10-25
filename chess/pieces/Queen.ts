import { bishopOffsets } from "./Bishop";
import { Color, Piece, Position } from "./Piece";
import { rookOffSets } from "./Rook";

const queenOffsets = [...rookOffSets, ...bishopOffsets];

export class Bishop extends Piece {
  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(position: Position): Position[] {
    return this.possibleMoves(queenOffsets, position);
  }

  getColor(): Color {
    return this.color;
  }
}
