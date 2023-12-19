import { Engine } from "./engine";
import { MainScene } from "./scenes/main.scene";

export class Game {
    container: HTMLElement;

    engine: Engine;
    scene: MainScene;

    constructor(container: HTMLElement) {
        this.container = container;

        this.engine = new Engine(this);
        this.scene = new MainScene(this);
    }

    update(time: number) {
        this.scene.update(time);
    }

    destroy() {
        this.engine.destroy();
        this.scene.destroy();
    }
}
