const SPEED = 320;
var zoom = 300;

const player = add([
    sprite("apple"),
    pos(center()),
    z(5),
]);

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    zoom = zoom + 30;
    debug.log(zoom);
});

onKeyDown("down", () => {
    zoom = zoom - 30;
    debug.log(zoom);
});

camScale(1.1);




loop(1.1, () => {
    add([
        sprite("road"),
        pos(width()/2, height()/9999999),
        move(DOWN, 300),
        offscreen({destroy: true}),
        anchor("center"),
        "road",
    ])
})


