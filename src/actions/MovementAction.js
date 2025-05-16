import * as THREE from 'three';
import { Action } from '../actions';
import { search } from '../pathfinding';
import { GameObject } from '../objects/GameObject';

const breadcrumb = new THREE.Mesh(
  new THREE.SphereGeometry(0.1),
  new THREE.MeshBasicMaterial()
);

export class MovementAction extends Action {
  name = 'Move';

  path = [];
  pathIndex = 0;
  pathUpdater = null;

  /**
   * @type {GameObject}
   */
  constructor(source) {
    super(source);
  }

  async perform(world) {
    return new Promise((resolve) => {
      function updateSourcePosition() {
        // If we reached the end of the path, then stop
        // the movement update interval, clear the path
        // breadcrumbs, and resolve this action to unblock
        // the combat manager
        if (this.pathIndex === this.path.length) {
          clearInterval(this.pathUpdater);
          world.path.clear();
          resolve();
          // Otherwise, move source object to the next path node
        } else {

          const curr = this.path[this.pathIndex++];
          world.moveObject(this.source,curr)

          this.source.moveTo(curr);
          console.log("move to ", curr);

        }
      }

      // Clear the existing path update interval
      clearInterval(this.pathUpdater);

      //updateStatus('Moving...');

      // Add breadcrumbs to the world
      this.path.forEach((coords) => {
        const node = breadcrumb.clone();
        node.position.set(coords.x + 0.5, 0, coords.z + 0.5);
        world.path.add(node);
      });

      // Trigger interval function to update player's position
      this.pathIndex = 0;
      this.pathUpdater = setInterval(updateSourcePosition.bind(this), 300);
    });
  }

  async canPerform(world) {
    const selectedCoords = await this.source.getTargetSquare();

    // Find path from player's current position to the selected square
    this.path = search(
      this.source.coords,
      selectedCoords,
      world);

    if (this.path === null) {
      return {
        value: false,
        reason: 'Could not find path to target square.'
      };
    }

    if (this.path.length === 0) {
      return {
        value: false,
        reason: 'Pick square other than starting square'
      };
    }

    // Return true if a valid path was found
    return { value: true };
  }
}




/*this.raycaster.setFromCamera( coords, this.camera );

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

        updatePosition() {
            if(this.pathIndex === this.path.length) {
                clearInterval(this.pathUpdater);
                this.world.path.clear();
                return;
            }
            const current = this.path[this.pathIndex];
            this.position.set(current.x + 0.5, 0.25, current.z + 0.5);
            this.pathIndex++;
        }*/