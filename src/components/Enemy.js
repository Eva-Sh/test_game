import Template from './Template';
import Shot from './Shot';

export default class Enemy extends Template {
    constructor(game, initialPosition, size={width: 15, height: 15}) {
        super(game, size, initialPosition);

        this.patrolX = 0;
        this.speed = 3;
    }

    update() {
        if (this.patrolX < 0 || this.patrolX > 600) {
            this.speed = -this.speed;
        }

        if (Math.random() > 0.995 && !this.alliedBellow()) {
            this.shoot();
        }

        this.position.x += this.speed;
        this.patrolX += this.speed;
    }

    alliedBellow() {
        let invader = this,
            alliesBellow = 0;

        for(let b of this.game.bodies) {
            if (
                b instanceof Enemy &&
                Math.abs(invader.position.x - b.position.x) < b.size.width &&
                b.position.y > invader.position.y
            ) {
                alliesBellow++
            }
        }

        return alliesBellow > 0;
    }

    shoot() {
        this.game.addBody(new Shot(
            this.game,
            {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height + 5}
        ));
    }

    onDestroyed() {
        let self = this.constructor;

        if (--self.enemiesLeft <= 0) {
            self.onDestroyedAll();
        }

        console.log(self.enemiesLeft);
    }

    static onDestroyedAll() {
        window.alert('you won');
    }
}
