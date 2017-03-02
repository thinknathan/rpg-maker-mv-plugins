/*:
 * @plugindesc N1.00 Sets HP threshold for low health effects.
 * @author Think_Nathan
 
 * @param Actor Low HP Formula
 * @desc Formula to determine when an actor's HP is low
 * @default this.isAlive() && this._hp < this.mhp / 3
 
 * @param Enemy Low HP Formula
 * @desc Formula to determine when an enemy's HP is low
 * @default this.isAlive() && this._hp < this.mhp / 5
 
 * @help Sets HP threshold for low health effects.
 */

var Imported = Imported || {};
Imported.N_CrisisHPThreshold = true;

var ThinkN = ThinkN || {};
ThinkN.N_CrisisHPThreshold = ThinkN.N_CrisisHPThreshold || {};

ThinkN.N_CrisisHPThreshold.ActorFormula = String(PluginManager.parameters('N_CrisisHPThreshold')['Actor Low HP Formula']);
ThinkN.N_CrisisHPThreshold.EnemyFormula = String(PluginManager.parameters('N_CrisisHPThreshold')['Enemy Low HP Formula']);

// Overwrite core method
Game_BattlerBase.prototype.isDying = function () {
  if (this.isActor()) {
    return eval(ThinkN.N_CrisisHPThreshold.ActorFormula);
  } else {
    return eval(ThinkN.N_CrisisHPThreshold.EnemyFormula);
  }
};