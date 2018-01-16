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
        this.initEnemy();
    }

    update() {
        this.bodies.forEach(body => body.update());
        this.draw();
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
    }

    initPlayer() {
        this.addBody(new Player(this));//добавим игорка
    }
    initEnemy() {
        Enemy.enemiesLeft = 0;

        for(var i = 0; i < 55; i++ ) {
            this.addBody(new Enemy(this, {
                x: 50 + (i%11) * 30,
                y: 50 + (i%5) * 30
            }));

            Enemy.enemiesLeft++;
        }
    }

    addBody(body) {
        this.bodies.add(body);//добавляет объекты-тела
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
}
