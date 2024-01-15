import { gameItems } from '@/constants/game-items.js';
import constants from '@/constants';

const getItems = (grid) => {
  const flatted = grid.flat().filter((cell) => {
    if (
      [
        constants.CELL_TYPES.block,
        constants.CELL_TYPES.player,
        constants.CELL_TYPES.finish,
      ].includes(cell.type)
    ) {
      return false;
    }

    if (
      cell.x === constants.PLAYER_START.x &&
      cell.y === constants.PLAYER_START.y
    ) {
      return false;
    }

    return true;
  });

  const items = [];

  for (let i = 0; i < gameItems.length; i += 1) {
    const startIndx = Math.floor(Math.random() * flatted.length);
    const endIndx = 1;

    const item = flatted.splice(startIndx, endIndx)[0];

    item.type = gameItems[i].type;
    item.data = gameItems[i].data;
    items.push(item);
  }
  return items;
};

export { getItems };
