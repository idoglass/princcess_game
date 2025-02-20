import * as THREE from 'three';
import { search } from './pathfinding';
export class Player extends THREE.Mesh {
    /**
     * @type {THREE.Raycaster}
     */
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    constructor(camera, world) {
        super();
        this.geometry = new THREE.CapsuleGeometry(0.25,0.5);
        this.material = new THREE.MeshStandardMaterial({color: 0x4040c0})
        this.position.set(5.5,0.25,5.5)

        this.camera = camera;
        this.terrain = world.terrain;
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

        this.raycaster.setFromCamera( coords, this.camera );

        // calculate objects intersecting the picking ray
        const intersection = this.raycaster.intersectObject( this.terrain );

        if ( intersection.length > 0 ) {

            const selectedCoords = new THREE.Vector2(
                Math.floor(intersection[0].point.x),
                Math.floor(intersection[0].point.z)
            )

            const playerCoords = new THREE.Vector2(
                Math.floor(this.position.x),
                Math.floor(this.position.z)
            )
            search(playerCoords, selectedCoords, this.world)
            
        }
    }

}