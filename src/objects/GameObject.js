import * as THREE from 'three';

export class GameObject extends THREE.Mesh {
    



    /**
     * @type {THREE.Vector3}
     */
    coords;


    /**
     * 
     * @param {THREE.Vector3} coords 
     * @param {THREE.BufferGeometry} geomatry
     * @param {THREE.Material} material
     */
    constructor(coords, geomatry, material) {
        super(geomatry, material);
        this.coords = coords;
        this.position.set(coords.x, coords.y, coords.z);


    }
}