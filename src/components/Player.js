import Template from './Template';

export default class Player extends Template {
    constructor(game, size={width: 30, height: 10}, initialPosition) {
        initialPosition = initialPosition || { x: (game.canvas.width / 2) - (size.width / 2), y: game.canvas.height - 45 };

        super(game, size, initialPosition);
    }
}
