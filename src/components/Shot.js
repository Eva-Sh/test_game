import Template from './Template';

export default class Shot extends Template {
    constructor(game, initialPosition, direction='down', size = { width: 5, height: 5 }) {
        super (game, size, initialPosition);

        this.direction = direction;
        this.speed = 3;
    }

    update() {
        this.position.y += this.direction === 'up' ? -this.speed : this.speed;
    }
}
