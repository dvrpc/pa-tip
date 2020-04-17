export const fetchSprite = (async () => {
  const spriteStream = await fetch(
    "https://tiles.dvrpc.org/data/styles/dvrpc-pa-tip/sprite.json"
  );
  const spriteSheet = await spriteStream.json();
  return spriteSheet;
})();
