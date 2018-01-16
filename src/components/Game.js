import Player from './Player';
import Actions from './Actions';
import Enemy from './Enemy';

export default class Game {
    constructor(canvasId='canvas', size={width: 1000, height:600}) {
        let canvas = document.getElementById(canvasId);

        canvas.width = size.width;
        canvas.height = size.height;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.input = null;
        this.bodies = new Set;
        this.loaded = false;
    }

    load() {
        this.initPlayer();
        this.initEnemies();
        this.bodies.forEach(body => body.load());
        this.loaded = true;
        console.log('Game loaded.');
    }

    update() {
        this.bodies.forEach(body => body.update());

        this.draw();

        this.reportCollisions();

        this.collectGarbage();

        window.requestAnimationFrame(this.update.bind(this));
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bodies.forEach(body => body.draw());
    }

    init() {
        this.input = new Actions();

        this.load();
        this.update();
        console.log('Game started.');
    }

    initPlayer() {
        this.addBody(new Player(this));
    }

    initEnemies() {
        Enemy.enemiesLeft = 0;

        for(var i = 0; i < 55; i++) {
            this.addBody(new Enemy(this, {
                x: 50 + (i % 11) * 30 ,
                y: 50 + (i % 5) * 30
            }));

            Enemy.enemiesLeft++;
        }
    }

    addBody(body) {
        this.bodies.add(body);
    }

    removeBody(body) {
        this.bodies.delete(body);
    }

    collectGarbage() {
        let canvas = this.canvas,
            aliveBodies = new Set;

        for(let body of this.bodies) {
            if (
                !(body.position.x < -10 ||
                    body.position.x > canvas.width + 10 ||
                    body.position.y < -10 ||
                    body.position.y > canvas.height + 10)
            ) {
                aliveBodies.add(body);
            }
        }

        this.bodies = aliveBodies;
    }

    bodiesCollided(bodyA, bodyB) {
        return (
            bodyA !== bodyB &&
            bodyA.position.x < bodyB.position.x + bodyB.size.width &&
            bodyA.position.x + bodyA.size.width > bodyB.position.x &&
            bodyA.position.y < bodyB.position.y + bodyB.size.height &&
            bodyA.size.height + bodyA.position.y > bodyB.position.y
        );
    }

    reportCollisions() {
        let total = this.bodies.size,
            bodiesArray = Array.from(this.bodies),
            collidedPairs = new Set;

        for(let i = 0; i < total; i++) {
            for(let j = i + 1; j < total; j++) {
                let bodyA = bodiesArray[i];
                let bodyB = bodiesArray[j];

                if (this.bodiesCollided(bodyA, bodyB)) {
                    collidedPairs.add(bodyA);
                    collidedPairs.add(bodyB);
                }
            }
        }

        collidedPairs.forEach(collidedBody => collidedBody.collision());
    }
}
