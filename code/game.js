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




var pause = 1;
for (let i = 0; i < 6; i++) {
    pause = pause + 1;
    debug.log(pause);
    wait(pause, () => {
    const road = add([
        sprite("apple"),
        pos(width()/2, pause),
        move(DOWN, 300),
        
    ]);

})
    
}

if (road.pos.y >= 600) {
    road.pos.y = 20;

};
