import * as THREE from 'three';
import { GameObject } from './GameObject';
import { Const } from 'three/tsl';



const treeGeometry = new THREE.ConeGeometry(1, 2, 8);
const treeMaterial = new THREE.MeshStandardMaterial({
    color: 0x305100,
    flatShading: true
});

export class Tree extends GameObject {
    
    minTreeHeight = 0.8;
    maxTreeHeight = 1.2;

    treeRadius = 0.3;



    /**
     * 
     * @param {THREE.Vector3} coords 
     * @param {THREE.BufferGeometry} geomatry
     * @param {THREE.Material} material
     */
    constructor(coords) {
        const mesh = new THREE.Mesh (treeGeometry, treeMaterial)
        mesh.position.set(0.5,0,0.5);
        super(coords, mesh);

        const height = this.minTreeHeight + Math.random() * (this.maxTreeHeight - this.minTreeHeight); 
        this.mesh.scale.set(this.treeRadius,height,this.treeRadius)

        this.name = `Tree (${coords.x},${coords.y})`
        
        this.position.set(
            coords.x,
            height ,
            coords.z
        )
    }
}