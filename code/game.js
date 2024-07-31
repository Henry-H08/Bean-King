const SPEED = 320;

var zoom = 0;

var loopspeed = 1;

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






loop(loopspeed, () => {
    add([
            rect(12, 48),
            area(),
            pos(width()/2, (height()/15)-65),
            anchor("top"),
            color(127, 127, 255),
            outline(4),
            move(DOWN, 300),
            offscreen({ destroy: true }),
            z(1),
            "line",
        ]);
})




