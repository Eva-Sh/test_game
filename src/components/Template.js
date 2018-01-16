export default class Template {
    constructor(game, size, initialPosition) { //процесс, размеры, начальная позиция
        this.game = game;
        this.size = size;
        this.position = initialPosition;
        this.speed = 0;
    }
    load() {
        //загрузка предметов тела
    }
    collision() {
        this.onDestroyed();

        this.game.removeBody(this);
    }
    update() {
        //отвечает за обновление экарана игры
    }
    draw() {
        this.game.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        this.game.context.fillStyle = 'green';
    }
    onDestroyed() {

    }
}
