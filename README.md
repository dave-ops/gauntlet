# gauntlet

## folder structure
```
public/
├── index.html
├── styles.css
├── input.js
├── audio.js
├── biome.js
├── world.js
├── player.js
├── items.js
├── monsters.js
├── entityRenderer.js
├── gameLogic.js
├── gameLoop.js
```

## maintenance

**aspect ratio**
Aspect Ratio: The world maintains its 1:1 aspect ratio (800x800) within the viewport, but if the viewport isn’t square (e.g., 16:9), the world will scale to fit the smaller dimension, leaving bars on the sides or top/bottom. If you want to stretch the world to fill non-square screens (distorting proportions), remove Math.min(scaleX, scaleY) and use scaleX or scaleY directly, but this may affect gameplay.