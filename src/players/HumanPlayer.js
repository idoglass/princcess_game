import * as THREE from 'three';
import { Player } from './Player';
import { MovementAction, WaitAction, Action } from '../actions';

export class HumanPlayer extends Player {
    name = 'HumanPlayer';

    /**
     * @type {THREE.Raycaster}
     */
    raycaster = new THREE.Raycaster();


    constructor(coords, camera, world) {
        super(coords, camera, world);

    }

    /**
 * Wait for the player to choose a target square
 * @returns {Promise<Vector3 | null>}
 */
    async getTargetSquare() {
        return new Promise((resolve, reject) => {

            function onMouseDown(event) {
                const coords = new THREE.Vector2(
                    (event.clientX / window.innerWidth) * 2 - 1,
                    - (event.clientY / window.innerHeight) * 2 + 1
                )


                this.raycaster.setFromCamera(coords, this.camera);

                // calculate objects intersecting the picking ray
                const intersection = this.raycaster.intersectObject(this.world.terrain);

                if (intersection.length > 0) {

                    const selectedCoords = new THREE.Vector3(
                        Math.floor(intersection[0].point.x),
                        0,
                        Math.floor(intersection[0].point.z)
                    )
                    window.removeEventListener('mousedown', onMouseDownBound);

                    resolve(selectedCoords);
                }
            };
            const onMouseDownBound = onMouseDown.bind(this);
            window.addEventListener('mousedown', onMouseDownBound);
        });
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

        const statusText = document.getElementById('status-text');
        const actionButtonContainer = document.getElementById('actions');
        
        actionButtonContainer.innerHTML = "";

        const actions = this.getActions();

        statusText.innerText = "waiting for action selection";
        return new Promise((resolve) => {
            actions.forEach((action) => {
                const btn = document.createElement('button');
                btn.innerText = action.name;
                btn.onclick = () => {
                    console.log('selected action', action.name);
                    
                    resolve(action);
                };
                actionButtonContainer.appendChild(btn);
            })
        })
    }

}