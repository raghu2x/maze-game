import { useSwipe } from '@vueuse/core';
import { ref, reactive, watch, onMounted } from 'vue';
import { getGrid } from '@/compositions/grid';
import { getKeyDirection } from '@/compositions/keyboard';
import constants from '@/constants';

export const useGame = ({ mazeRef }) => {
  // const mazeRef = ref(null);
  const { direction } = useSwipe(mazeRef);
  const grid = ref([]);
  const player = ref(null);
  const playerIcon = ref(null);
  const modelData = reactive({});
  const showDialog = ref(false);
  const isPlayerAlive = ref(false);

  const renderPlayer = () => {
    grid.value
      .flat()
      .filter((cell) => cell.type !== constants.CELL_TYPES.block)
      .forEach((cell) => {
        if (cell.x === player.value.x && cell.y === player.value.y) {
          cell.type = constants.CELL_TYPES.player;
        } else if (cell.type === constants.CELL_TYPES.player) {
          cell.type = null;
        }
      });
  };

  const action = (cell) => {
    if (!cell.type || cell.type === constants.CELL_TYPES.player) return;

    showDialog.value = true;
    modelData.src = cell.data.src;
    modelData.title = cell.data.title;
    modelData.type = cell.type;
    console.log('my action perform', cell);
  };

  const isBlock = (x, y) => {
    const nextCell = grid.value[y][x];
    return nextCell.type === constants.CELL_TYPES.block;
  };

  const resetPlayer = () => {
    player.value = { ...constants.PLAYER_START };
    renderPlayer();
  };

  const updateGridSize = () => {
    if (!mazeRef.value) {
      console.warn('mazeSize: Unable to get maze size');
      return;
    }

    isPlayerAlive.value = false;
    grid.value = getGrid(mazeRef.value);
    resetPlayer();
  };

  const randomPlayerIcon = () => {
    const randomIndex = Math.floor(Math.random() * constants.ICONS.length);
    return constants.ICONS[randomIndex];
  };

  const moveTo = (x, y) => {
    const newPlayerX = player.value.x + x;
    const newPlayerY = player.value.y + y;

    if (isBlock(newPlayerX, newPlayerY)) {
      return;
    }

    player.value.x = newPlayerX;
    player.value.y = newPlayerY;
  };

  const isPaused = () => !isPlayerAlive.value || showDialog.value;

  const game = {
    start() {
      if (!isPlayerAlive.value) {
        isPlayerAlive.value = true;
      }
    },
    action: (act) => {
      switch (act) {
        case 'up':
          moveTo(0, -1);
          break;
        case 'down':
          moveTo(0, 1);
          break;
        case 'left':
          moveTo(-1, 0);
          break;
        case 'right':
          moveTo(1, 0);
          break;

        default:
          break;
      }
    },
  };

  const keyboardHandler = (event) => {
    const KEYCODE_SPACE = 32;
    const { keyCode } = event;

    if (keyCode === KEYCODE_SPACE) {
      game.start();
      return;
    }

    if (isPaused()) return;
    game.action(getKeyDirection(keyCode));
  };

  const onSwipe = (event) => {
    if (isPaused()) return;

    event.preventDefault();
    game.action(direction.value);
  };

  const beforeMoveHook = ({ playerX, playerY }) => {
    const nextCell = grid.value[playerY][playerX];

    if (nextCell.type === constants.CELL_TYPES.finish) {
      console.log('game finished');
      updateGridSize();
      return;
    }

    action(nextCell);
  };

  watch(
    player,
    (newVal, oldVal) => {
      // console.log(newVal, oldVal);
      beforeMoveHook({ playerX: newVal.x, playerY: newVal.y });
      renderPlayer();
    },
    { deep: true }
  );

  onMounted(() => {
    player.value = { ...constants.PLAYER_START };
    playerIcon.value = randomPlayerIcon();
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    document.addEventListener('keydown', (event) => {
      keyboardHandler(event);
    });
  });

  return {
    isPlayerAlive,
    showDialog,
    modelData,
    grid,
    playerIcon,
    onSwipe,
  };
};
