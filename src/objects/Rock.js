import * as THREE from 'three';
import { GameObject } from './GameObject';
import { getRandomFloat } from '../utils/random';


const rockGeometry = new THREE.SphereGeometry(
    1,
    7,
    5
);
const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0xb0b0b0,
    flatShading: true
});


export class Rock extends GameObject {
    

    minRockRadius = 0.1;
    maxRockRadius = 0.3;

    minRockHeight = 0.2;
    maxRockHeight = 0.4;



    /**
     * 
     * @param {THREE.Vector3} coords 
     * @param {THREE.BufferGeometry} geomatry
     * @param {THREE.Material} material
     */
    constructor(coords) {
        const mesh = new THREE.Mesh (rockGeometry, rockMaterial)
        mesh.position.set(0.5,0,0.5);
        super(coords, mesh);        
        const radius = getRandomFloat(this.minRockRadius, this.maxRockRadius);
        const height = getRandomFloat(this.minRockHeight , this.maxRockHeight);

        this.mesh.scale.set(radius,height,radius)
        this.name = `Rock (${coords.x},${coords.y})`
                
        this.position.set(
            coords.x ,
            this.minRockHeight - height ,
            coords.z
        )
    }
}