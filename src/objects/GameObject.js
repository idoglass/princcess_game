import * as THREE from 'three';
import { createTextMaterial } from '../utils/util';

export class GameObject extends THREE.Mesh {


    /**
     * @type { THREE.Mesh } mesh
     */
    mesh;


    /**
     * @type {THREE.Vector3}
     */
    coords;
    /**
     * @type {number}
     */
    hitPoints = 10;

    /**
     * @type {number}
     */
    maxHitPoints = 10;

    /**
     * @type {THREE.Sprite}
     */
    healthOverlay;


    /**
     * 
     * @param {THREE.Vector3} coords 
     * @param {THREE.Mesh} mesh
     */
    constructor(coords, mesh) {
        super();
        this.coords = coords;

        this.mesh =  mesh;
        this.add(mesh);

        this.childGroup = new THREE.Group();


        this.healthOverlay = new THREE.Sprite();


        this.childGroup.add( this.healthOverlay );
        this.add(this.childGroup);

        this.childGroup.scale.x = 1 / this.scale.x;
        this.childGroup.scale.y = 1 / this.scale.y;
        this.childGroup.scale.z = 1 / this.scale.z;


        const boundingBox = new THREE.Box3().setFromObject(this.mesh);
        const meshHeight = boundingBox.max.y - boundingBox.min.y;
        console.log('Mesh Height:', meshHeight);

        this.healthOverlay.position.x = 0.5;
        this.healthOverlay.position.z = 0.5;
        console.log(this.mesh.position)
        this.healthOverlay.position.y =  boundingBox.max.y * this.mesh.scale.y ;
        this.healthOverlay.visible = true;
        this.healthOverlay.layers.set(0);

        //prevent the helth overlay from being affected by the scale of the object

        this.updateHitpointOverlay();
    }


    get isDead() {
        return (this.hitPoints === 0);
    }
    
    hit(damage) {
        this.hitPoints -= damage;

        if (this.hitPoints <= 0) {
            this.hitPoints = 0;
        }

        this.updateHitpointOverlay();
    }

    /**
     * 
     * @param {THREE.Vector3} coords 
     */
    moveTo(coords) {
        this.coords = coords;
        this.position.set(coords.x , coords.y , coords.z );
    }

    getCoords() {
        return this.coords
    }



    updateHitpointOverlay() {
        if (this.healthOverlay.material) {
            this.healthOverlay.material.dispose();
        }
        this.healthOverlay.material = createTextMaterial(`${this.hitPoints}/${this.maxHitPoints}`);
    }
}