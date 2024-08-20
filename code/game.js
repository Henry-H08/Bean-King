

setGravity(3200);



// define some constants
const JUMP_FORCE = 1320;
const MOVE_SPEED = 480;
const FALL_DEATH = 2400;

const LEVELS = [
    [        

        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=                   =",
        "=     ==     ==     =",
        "=  ==           ==  =",
        "=====================",
    ],
    [
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "           $$         =   $",
        "  %      ====         =   $",
        "                      =   $",
        "                      =    ",
        "       ^^      = >    =   @",
        "===========================",
    ],
    [
        "     $    $    $    $     $",
        "     $    $    $    $     $",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "===========================",
    ],
];

// define what each symbol means in the level graph
const levelConf = {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
            offscreen({ hide: true }),
            "platform",
        ],
        
        "^": () => [
            sprite("spike"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
            offscreen({ hide: true }),
            "danger",
        ],
        
    },
};

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
    // add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], levelConf);

    // define player object
    const player = add([
        sprite("bean"),
        pos(center()),
        area(),
        scale(1),
        // makes it fall to gravity and jumpable
        body(),
        // the custom component we defined above
        
        anchor("top"),
    ]);

    // action() runs every frame
    player.onUpdate(() => {
        // center camera to player
        camPos(width()/2, player.pos.y);
        // check fall death
        if (player.pos.y >= FALL_DEATH) {
            go("lose");
        }
        if (player.pos.y <= 0) {
            go("lose");
        }
    });

    

    player.onPhysicsResolve(() => {
        // Set the viewport center to player.pos
        camPos(width()/2, player.pos.y);
    });

    // if player onCollide with any obj with "danger" tag, lose
    player.onCollide("danger", () => {
        go("lose");
        play("hit");
    });

 

    function jump() {
        // these 2 functions are provided by body() component
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }


    onKeyPress("up", jump);

    onKeyDown("left", () => {
        player.move(-MOVE_SPEED, 0);
    });

    onKeyDown("right", () => {
        player.move(MOVE_SPEED, 0);
    });


    
    onKeyPress("f", () => {
        setFullscreen(!isFullscreen());
    });
});

scene("lose", () => {
    add([
        text("You Lose"),
    ]);
    onKeyPress(() => go("game"));
});

scene("win", () => {
    add([
        text("You Win"),
    ]);
    onKeyPress(() => go("game"));
});

go("game");

