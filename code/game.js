
const SPEED = 320;
const ENEMY_SPEED = 160;


// Add player game object

const player = add([
    sprite("bean"),
    pos(80, 80),
    area(),
    anchor("center"),
    z(12),
    health(1),
    "player",
    
]);

for (let i = 1; i < 2; i++) {
    player.add([
        sprite("bean"),
        rotate(0),
        anchor(vec2(i).scale(0)),
        scale(4),
        z(1),
        area(),
        opacity(0),
        "detector",
        {
            speed: i * 8,
        },
    ]);
}



while (i < 10) {
    wait(3);
  const enemy = add([
    sprite("apple"),
    pos((rand(0, width()), rand(0, height()))),
    anchor("center"),
    area(),
    // This enemy cycle between 3 states, and start from "idle" state
    state("move", ["idle", "attack", "move"]),
    z(5),
    health(3),
    "enemy",
]);
  i++;
}













// Run the callback once every time we enter "idle" state.
// Here we stay "idle" for 0.5 second, then enter "attack" state.
enemy.onStateEnter("idle", async () => {
    await wait(0.5);
    enemy.enterState("attack");
});

// When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
enemy.onStateEnter("attack", async () => {
    // Don't do anything if player doesn't exist anymore
    if (player.exists()) {
        const dir = player.pos.sub(enemy.pos).unit();

    }

    await wait(1);
    enemy.enterState("move");
});



// Like .onUpdate() which runs every frame, but only runs when the current state is "move"
// Here we move towards the player every frame if the current state is "move"
enemy.onStateUpdate("move", () => {
    if (!player.exists()) return;
    const dir = player.pos.sub(enemy.pos).unit();
    enemy.move(dir.scale(ENEMY_SPEED));
});



// Register input handlers & movement
onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});

var attime = 0;
var httime = 0;



enemy.onCollideUpdate("detector", () => {
    if (attime == 0) {
        debug.log(attime);
        attime = 2;
        enemy.hurt(1)
        wait(1, () => {
            attime = 0;
        })
    }

});

enemy.on("death", () => {
    destroy(enemy)
})

