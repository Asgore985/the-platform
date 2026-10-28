// ==========================================
// STEP 1: INITIALIZE THE PLAYER & CAMERA
// ==========================================

// Create the player sprite (using a default placeholder square from MakeCode's system)
let player = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e f f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e e d f d d f d e e f . . 
    . . f e d d f d d f d d e f . . 
    . . f e d d d d d d d d e f . . 
    . . f f e e d d d d e e f f . . 
    . . f f f f f f f f f f f f . . 
    . . . f f f f f f f f f f . . . 
    . . . . f f . . . . f f . . . . 
    `, SpriteKind.Player)

// Assign standard controller movement (Left / Right only)
controller.moveSprite(player, 100, 0)

// Apply downward gravity (Y-axis acceleration)
player.ay = 350

// Keep the game screen centered on the moving player
scene.cameraFollowSprite(player)

// ==========================================
// STEP 2: DEFINE THE TILEMAP WORLD
// ==========================================

// This builds a simple, long side-scrolling level structure.
// Note: In MakeCode, it's usually easiest to design this visually 
// in the Tilemap Editor, but this code builds the structural backing.
tiles.setCurrentTilemap(tilemap`level1`)

// ==========================================
// STEP 3: PLATFORMER JUMP MECHANIC
// ==========================================

// Listen for the player pressing the A button (or Spacebar on desktop)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // Only allow a jump if the character is currently standing on a solid wall/floor
    if (player.isHittingTile(CollisionDirection.Bottom)) {
        // Negative velocity propels the character upward against gravity
        player.vy = -150
    }
})

// ==========================================
// STEP 4: WIN & LOSS CONDITIONS (TILE OVERLAPS)
// ==========================================

// HAZARD: Player hits spikes or lava (represented here by a red block tile)
scene.onOverlapTile(SpriteKind.Player, img`myTiles.hazardRedTile`, function (sprite, location) {
    game.gameOver(false)
})

// GOAL: Player reaches the end chest or portal (represented here by a gold tile)
scene.onOverlapTile(SpriteKind.Player, img`myTiles.goalGoldTile`, function (sprite, location) {
    game.gameOver(true)}
    