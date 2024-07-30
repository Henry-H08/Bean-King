const SPEED = 320;


function lines() {
        add([
            rect(12, 48),
            area(),
            pos(center()),
            anchor("center"),
            color(127, 127, 255),
            outline(4),
            move(DOWN, 320),
            offscreen({ destroy: true }),
            "line",
        ]);
    }

onUpdate(() => {
    wait(5, () => {
    lines()
})
})


const player = add([
    sprite("apple"),
    pos(center()),
]);

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});





