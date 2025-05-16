import * as THREE from 'three';
import { World } from './world';
import { Player } from './players/Player';

import { MovementAction } from './actions/MovementAction';
import { WaitAction } from './actions/WaitAction';

import { colorToHexString } from './utils/colors'

export class CombatManager {
  /**
   * Main combat loop
   * @param {[Player]} players 
   */
  async takeTurns(players, world) {
    while (true) {
      for (const player of players) {
        if (player.isDead) continue;

        let actionPerformed = false;

        player.material.color = new THREE.Color(0xffff00);

        console.log(`Waiting for ${player.name} to select an action`);

        do {
          const avatar = document.getElementById("player-avatar")
          if (avatar) {
            avatar.style.backgroundColor = colorToHexString(player.getColor());    
            console.log(colorToHexString(player.getColor()));
                    
          }
          const action = await player.requestAction();
          const result = await action.canPerform(world);
          if (result.value) {
            // Wait for the player to finish performing their action
            await action.perform(world);
            actionPerformed = true;
          } else {
            console.log(result.reason);
          }
        } while (!actionPerformed)

        player.material.color = new THREE.Color(0x0000ff);
      }
    }
  }
}