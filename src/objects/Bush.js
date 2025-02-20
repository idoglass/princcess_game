import * as THREE from 'three';
import { GameObject } from './GameObject';

import { getRandomFloat } from '../utils/random';

const bushGeometry = new THREE.SphereGeometry(1, 16, 16); // Adjust radius for size
const bushMaterial = new THREE.MeshStandardMaterial({
  color: 0x228B22, // Forest green
  // color: 0x006400, // Darker green
  // color: 0x32CD32, // Lime green
  flatShading: true, // Optional: Gives a more stylized look
});

export class Bush extends GameObject {

    minBushRadius = 0.1;
    maxBushRadius = 0.3;

    minBushHeight = 0.1;
    maxBushHeight = 0.3;
    
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

        super(coords, bushGeometry, bushMaterial);
        const radius = getRandomFloat(this.minBushRadius, this.maxBushRadius);
        const height = getRandomFloat(this.minBushHeight, this.maxBushHeight);

        this.scale.set(radius, radius, radius);
        this.name = `Bush (${coords.x},${coords.y})`
        
        console.log(radius, height);


        
        
        this.position.set(
            coords.x + 0.5,
            coords.y + height / 2,
            coords.z + 0.5
        )
}

}