import * as THREE from 'three';
import { search } from './pathfinding';
export class Player extends THREE.Mesh {
    /**
     * @type {THREE.Raycaster}
     */
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector3();

    path = [] ;
    pathIndex = 0;

    constructor(camera, world) {
        super();
        this.geometry = new THREE.CapsuleGeometry(0.25,0.5);
        this.material = new THREE.MeshStandardMaterial({color: 0x4040c0})
        this.position.set(5.5,0.25,5.5)

        this.camera = camera;
        this.world = world;

        window.addEventListener( 'mousedown', this.onMouseDown.bind(this) );

    }

    /**
     * @param {MouseEvent} event
     */

    onMouseDown(event) {
        
        const coords = new THREE.Vector2(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        )

        console.log(coords);
        

        this.raycaster.setFromCamera( coords, this.camera );

        // calculate objects intersecting the picking ray
        const intersection = this.raycaster.intersectObject( this.world.terrain );

        if ( intersection.length > 0 ) {

            const selectedCoords = new THREE.Vector3(
                Math.floor(intersection[0].point.x),
                0,
                Math.floor(intersection[0].point.z)
            )
            console.log(selectedCoords);

            const playerCoords = new THREE.Vector3(
                Math.floor(this.position.x),
                0,
                Math.floor(this.position.z)
            )
            console.log(playerCoords);

            this.path = search(playerCoords, selectedCoords, this.world)

            if(this.path === null) return;

            this.world.path.clear();
            for (let index = 0; index < this.path.length; index++) {
                const coords = this.path[index];
                const geometry = new THREE.BoxGeometry(0.1,0.1,0.1);
                const material = new THREE.MeshStandardMaterial({color: 0xffffff});
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(coords.x + 0.5, 0.1, coords.z + 0.5);
                this.world.path.add(cube);
            }  
            this.pathIndex = 0;
            this.pathUpdater = setInterval(this.updatePosition.bind(this), 800);
        }
    }

    updatePosition() {
        if(this.pathIndex === this.path.length) {
            clearInterval(this.pathUpdater);
            this.world.path.clear();
            return;
        }
        const current = this.path[this.pathIndex];
        this.position.set(current.x + 0.5, 0.25, current.z + 0.5);
        this.pathIndex++;
    }

}