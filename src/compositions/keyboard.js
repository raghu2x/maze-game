// const KEYCODE_ENTER = 13;
// const KEYCODE_SPACE = 32;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_W = 87;
const KEYCODE_A = 65;
const KEYCODE_D = 68;
const KEYCODE_S = 83;

/**
 * Maps key codes to movement directions.
 * @param {number} keyCode - The key code to map.
 * @returns {string|null} The corresponding movement direction or null if not mapped.
 */
const getKeyDirection = (keyCode) => {
  const keyDirectionMap = {
    [KEYCODE_LEFT]: 'left',
    [KEYCODE_A]: 'left',
    [KEYCODE_RIGHT]: 'right',
    [KEYCODE_D]: 'right',
    [KEYCODE_UP]: 'up',
    [KEYCODE_W]: 'up',
    [KEYCODE_DOWN]: 'down',
    [KEYCODE_S]: 'down',
  };

  // Return the mapped direction, or null if the key code is not recognized
  return keyDirectionMap[keyCode] || null;
};

export { getKeyDirection };
