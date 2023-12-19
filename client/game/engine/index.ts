import { WebGLRenderer } from 'three';


import type { Game } from "..";

export class Engine {
    game: Game;
    width: number = 0;
    height: number = 0;
    renderer: WebGLRenderer;

    constructor(game: Game) {
        this.game = game;

        this.width = game.container.clientWidth;
        this.height = game.container.clientHeight;

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setAnimationLoop(this.update.bind(this));

        this.game.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this));
    }

    update(time: number) {
        this.game.update(time);
        this.render(this.game.scene);
    }

    resize() {
        this.width = this.game.container.clientWidth;
        this.height = this.game.container.clientHeight;

        this.renderer.setSize(this.width, this.height);
        this.game.scene.camera.aspect = this.width / this.height;
        this.game.scene.camera.updateProjectionMatrix();
    }

    render(scene: any) {
        this.renderer.render(scene.scene, scene.camera);
    }

    destroy() {
        this.renderer.dispose();
    }
}
