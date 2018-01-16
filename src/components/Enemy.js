import Template from './Template';

export default class Enemy extends Template {
    constructor(game, initialPosition, size = { width: 15, height: 15 }) {
        super(game, size, initialPosition);

        this.patrolX = 0;
        this.speed = 3;
    }
}
