const SPEED = 320;


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
    loopspeed = loopspeed - 0.5;
    debug.log(zoom);
});

onKeyDown("down", () => {
    zoom = zoom - 30;
    loopspeed = loopspeed + 0.5;
    debug.log(zoom);
});






loop(1, () => {
    const road = add([
    sprite("road"),
    pos(width()/2, (height()/15)-70),
    z(-1),
    move(DOWN, 300),
    anchor("bottom"),
    //scale(100),
    offscreen({destroy: true}),

]);
})



