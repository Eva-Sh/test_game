import Template from './Template';

export default class Enemy extends Template {
    constructor(game, initialPosition, size = { width: 15, height: 15 }) {
        super(game, size, initialPosition);

        this.patrolX = 0;
        this.speed = 3;
    }
    update() {
        if (this.patrolX < 0 || this.patrolX > 600) {
            this.speed = -this.speed;
        }

        this.position.x += this.speed;
        this.patrolX += this.speed;
    }
}
