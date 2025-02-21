const Biome = (function() {
    function getBiome(worldX, worldY) {
        if (worldX >= 0 && worldX < 400 && worldY >= 0 && worldY < 400) return { name: 'grass', color: '#32CD32' };
        else if (worldX >= 400 && worldX < 800 && worldY >= 0 && worldY < 400) return { name: 'snow', color: '#FFFFFF' };
        else if (worldX >= 0 && worldX < 400 && worldY >= 400 && worldY < 800) return { name: 'water', color: '#00B7EB' };
        return { name: 'grass', color: '#32CD32' };
    }
    return { getBiome };
})();