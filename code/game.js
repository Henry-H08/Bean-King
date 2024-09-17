const SPEED = 320;
const ENEMY_SPEED = 160;
var phealth = 3;


// Add player game object

const player = add([
    sprite("bean"),
    pos(80, 80),
    area(),
    anchor("center"),
    z(12),
    health(phealth),
    body(),
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


onKeyDown("space", () => {
    add([
    sprite("apple"),
    pos(rand(0, width()), rand(0, height())),
    anchor("center"),
    area(),
    z(5),
    health(33),
    "enemy",
]);
});



get('enemy').forEach((enemy) => {
    
    if (!player.exists()) return;
        const dir = player.pos.sub(enemy.pos).unit();
        enemy.move(dir.scale(ENEMY_SPEED));
        enemy.on("death", () => {
        destroy(enemy)
    });
    enemy.onCollideUpdate("detector", () => {
        if (attime == 0) {
            debug.log(attime);
            attime = 2;
            enemy.hurt(1);
            wait(1, () => {
                attime = 0;
            })
        }

    });
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








player.onCollideUpdate("enemy", () => {
    if (httime == 0) {
        debug.log(httime);
        httime = 2;
        player.hurt(1);
        phealth = phealth - 1;
        wait(1, () => {
            httime = 0;
        })
    }
    player.on("death", () => {
    destroy(player)
})

});





onUpdate(() => {
        healthscore.text = phealth;
    });

var healthscore = add([
        text(),
        pos(12, 32),
        fixed(),
        { health: 0 },
        color(BLACK),
    ]);

