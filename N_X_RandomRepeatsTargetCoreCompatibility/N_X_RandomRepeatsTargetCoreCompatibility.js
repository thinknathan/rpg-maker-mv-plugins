/*:
 * @plugindesc N1.00 (Requires YEP_TargetCore, RandomRepeats) Fixes compatibility.
 * @author Yanfly, ThinkNathan

 * @help Fixes compatibility between YEP_TargetCore and Tsukihime's RandomRepeats.

 * Put this plugin BELOW all other plugins
 */

var Imported = Imported || {};
Imported.N_X_RandomRepeatsTargetCoreCompatibility = true;

Game_Action.prototype.makeTargets = function () {
  var targets = [];
  if (!this._forcing && this.subject().isConfused()) {
    targets = Yanfly.Target.Game_Action_makeTargets.call(this);
  } else if (this.isForCustom()) {
    targets = this.makeCustomTargets();
    // added
    targets = this.repeatTargets(targets);
  } else {
    targets = Yanfly.Target.Game_Action_makeTargets.call(this);
  }
  return targets;
};