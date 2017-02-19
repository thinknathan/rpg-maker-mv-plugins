/*:
 * @plugindesc N1.00 Removes damage display when < 1.
 * @author Yanfly, ThinkNathan
 *
 * @help Removes damage display when < 1.
 * Place underneath YEP_BattleEngineCore if using that plugin.
 */

var Imported = Imported || {};
Imported.N_HideZeroDamage = true;

// Overwrite core method
Sprite_Damage.prototype.setup = function (target) {
  if (Imported.YEP_BattleEngineCore) {
    this._result = target.shiftDamagePopup();
    var result = this._result;
  } else {
    var result = target.shiftDamagePopup();
  }
  if (result.missed || result.evaded) {
    this.createMiss();
  } else if (result.hpAffected && result.hpDamage !== 0) {
    this.createDigits(0, result.hpDamage);
  } else if (target.isAlive() && result.mpDamage !== 0) {
    this.createDigits(2, result.mpDamage);
  }
  if (result.critical) {
    this.setupCriticalEffect();
  }
};