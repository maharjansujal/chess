export type Color = "white" | "black";

const indices = Array.from({ length: 8 }, (_, i) => i + 1);

export const boardCoordinates = indices.map((row) =>
  indices.map((col) => [row, col]),
);

export type Position = [number, number];

export abstract class Piece {
  constructor(protected color: Color) {}

  getColor(): Color {
    return this.color;
  }

  possibleMoves(offsets: Position[], [row, col]: Position): Position[] {
    return offsets
      .map(
        ([rowOffset, colOffset]): Position => [
          row + rowOffset,
          col + colOffset,
        ],
      )
      .filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
  }
}
