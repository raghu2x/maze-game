import { getItems } from './maze-items.js';
import { getMaze } from './maze.js';

const isEvenNum = (num) => num % 2 === 0;

/**
 * This function returns mazeGrid size
 * @param {HTMLElement} mazeRef reference for mazeGrid
 * @returns{object} returns mazeGrid size
 */
const getGridSize = (mazeRef) => {
  const BLOCK_SIZE = 20; // maze block size

  if (!mazeRef) {
    console.warn('mazeSize:Unable to get maze size');
    return null;
  }

  const { offsetHeight, offsetWidth } = mazeRef;

  const x = Math.trunc(offsetWidth / BLOCK_SIZE);
  const y = Math.trunc(offsetHeight / BLOCK_SIZE);

  // here in grid size checking number is
  // odd/even because grid builder only work perfectly
  // for odd numbers
  return {
    x: isEvenNum(x) ? x - 1 : x,
    y: isEvenNum(y) ? y - 1 : y,
  };
};

// get grid
export const getGrid = (mazeRef) => {
  const { x, y } = getGridSize(mazeRef);
  const grid = getMaze(y, x);
  const items = getItems(grid);

  items.forEach((item) => {
    const cell = grid[item.y][item.x];
    cell.type = item.type;
    cell.data = item.data;
  });

  return grid;
};
