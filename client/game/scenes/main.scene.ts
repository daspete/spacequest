import { AmbientLight, BoxGeometry, DirectionalLight, GridHelper, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, Plane, PlaneGeometry, Scene } from "three";
import { Game } from "..";

export class MainScene {
    game: Game;
    scene: Scene;
    camera: PerspectiveCamera;

    ground: GridHelper;
    groundPlane: Mesh;

    ambientLight: AmbientLight;
    sunLight: DirectionalLight;

    constructor(game: Game) {
        this.game = game;

        this.scene = new Scene();

        this.camera = new PerspectiveCamera(60, this.game.engine.width / this.game.engine.height, 0.01, 1000);
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);

        this.ground = new GridHelper(15, 25);
        this.scene.add(this.ground);

        const groundGeometry = new PlaneGeometry(15, 15);
        groundGeometry.rotateX(-Math.PI / 2);

        this.groundPlane = new Mesh(groundGeometry, new MeshBasicMaterial({ visible: false }));
        this.scene.add(this.groundPlane);

        this.ambientLight = new AmbientLight(0x606080, 3);
        this.scene.add(this.ambientLight);

        this.sunLight = new DirectionalLight(0xffffff, 3);
        this.sunLight.position.set(0, 10, 10);
        this.scene.add(this.sunLight);
    }

    update(time: number) {

    }

    destroy() {

    }
}
