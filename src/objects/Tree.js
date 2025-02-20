import * as THREE from 'three';
import { GameObject } from './GameObject';
import { Const } from 'three/tsl';



const treeGeometry = new THREE.ConeGeometry(1, 1, 8);
const treeMaterial = new THREE.MeshStandardMaterial({
    color: 0x305100,
    flatShading: true
});

export class Tree extends GameObject {
    
    minTreeHeight = 0.9;
    maxTreeHeight = 2.5;

    treeRadius = 0.3;
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
    constructor(coords) {
        super(coords, treeGeometry, treeMaterial);

        const height = this.minTreeHeight + Math.random() * (this.maxTreeHeight - this.minTreeHeight); 
        this.scale.set(this.treeRadius, height, this.treeRadius);
        this.name = `Tree (${coords.x},${coords.y})`
        
        this.position.set(
            coords.x + 0.5,
            coords.y + height / 2,
            coords.z + 0.5
        )
    }
}