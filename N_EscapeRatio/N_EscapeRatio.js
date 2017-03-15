/*:
 * @plugindesc N1.00 Sets the battle escape ratio.
 * @author Think_Nathan
 
 * @param Escape Ratio Formula
 * @desc Formula for escaping battle.
 * @default 0.75 * $gameParty.agility() / $gameTroop.agility()
 
 * @help Sets the battle escape ratio.
 */

var Imported = Imported || {};
Imported.N_EscapeRatio = true;

var ThinkN = ThinkN || {};
ThinkN.N_EscapeRatio = ThinkN.N_EscapeRatio || {};

ThinkN.N_EscapeRatio.Formula = String(PluginManager.parameters('N_EscapeRatio')['Escape Ratio Formula']);

// Overwrite core method
BattleManager.makeEscapeRatio = function () {
  var ratio = eval(ThinkN.N_EscapeRatio.Formula);
  this._escapeRatio = ratio;
}