import * as THREE from 'three';
import { GameObject } from '../objects/GameObject';
import { MovementAction, WaitAction } from '../actions';
import { getRandomColor } from "../utils/colors"
const geometry = new THREE.CapsuleGeometry(0.25, 0.5);



/**
 * Base player class that human and computer players derive from
 */
export class Player extends GameObject {
    name = 'Player';

    /**
   * Instantiates a new instance of the player
   * @param {THREE.Vector3} coords 
   */
    constructor(coords, camera, world) {

        const color = getRandomColor()
        const material = new THREE.MeshStandardMaterial({ color: color })

  

        const mesh = new THREE.Mesh (geometry, material)
        mesh.position.set(0.5,0.2,0.5);
        super(coords, mesh);  

        world.addPlayer(coords, this)

        this.camera = camera;   
        this.world = world;
        this.moveTo(coords);
        this.color = color
        
    }


    getColor() {
      return this.color
    }
    /**
  * Wait for the player to choose a target square
  * @returns {Promise<Vector3 | null>}
  */
    async getTargetSquare() {
        return null;
    }

    /**
     * Wait for the player to choose a target GameObject
     * @returns {Promise<GameObject | null>}
     */
    async getTargetObject() {
        return null;
    }

    /**
     * Wait for the player to select an action to perform
     * @returns {Promise<Action | null>}
     */
    async requestAction() {
        return null;
    }

    /**
   * @returns {Action[]}
   */
  getActions() {
    return [
      new MovementAction(this),
      new WaitAction()
    ]
  }

}