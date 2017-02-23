/*:
 * @plugindesc N1.00 Allows battle commands to be disabled with a switch.
 * @author ThinkNathan
 
 * @param Skill Switch
 * @desc Actor skills disabled when this switch is on
 * @default 78
 
 * @param Attack Switch
 * @desc Actor attack disabled when this switch is on
 * @default 79
 
 * @param Guard Switch
 * @desc Actor guard disabled when this switch is on
 * @default 80
 
 * @param Item Switch
 * @desc Actor item disabled when this switch is on
 * @default 77

 * @help Allows battle commands to be disabled with a switch.
 */

var Imported = Imported || {};
Imported.N_BattleCommandsDisableSwitch = true;

var ThinkN = ThinkN || {};
ThinkN.N_BattleCommandsDisableSwitch = ThinkN.N_BattleCommandsDisableSwitch || {};

ThinkN.N_BattleCommandsDisableSwitch.SkillSwitch = parseInt(PluginManager.parameters('N_BattleCommandsDisableSwitch')['Skill Switch']);
ThinkN.N_BattleCommandsDisableSwitch.AttackSwitch = parseInt(PluginManager.parameters('N_BattleCommandsDisableSwitch')['Attack Switch']);
ThinkN.N_BattleCommandsDisableSwitch.GuardSwitch = parseInt(PluginManager.parameters('N_BattleCommandsDisableSwitch')['Guard Switch']);
ThinkN.N_BattleCommandsDisableSwitch.ItemSwitch = parseInt(PluginManager.parameters('N_BattleCommandsDisableSwitch')['Item Switch']);

// Overwrite core method
Window_ActorCommand.prototype.addSkillCommands = function () {
  var skillTypes = this._actor.addedSkillTypes();
  skillTypes.sort(function (a, b) {
    return a - b
  });
  skillTypes.forEach(function (stypeId) {
    var name = $dataSystem.skillTypes[stypeId];
    this.addCommand(name, 'skill', !$gameSwitches.value(ThinkN.N_BattleCommandsDisableSwitch.SkillSwitch), stypeId);
  }, this);
};

// Overwrite core method
Window_ActorCommand.prototype.addAttackCommand = function () {
  this.addCommand(TextManager.attack, 'attack', this._actor.canAttack() && !$gameSwitches.value(ThinkN.N_BattleCommandsDisableSwitch.AttackSwitch));
};

// Overwrite core method
Window_ActorCommand.prototype.addGuardCommand = function () {
  this.addCommand(TextManager.guard, 'guard', this._actor.canGuard() && !$gameSwitches.value(ThinkN.N_BattleCommandsDisableSwitch.GuardSwitch));
};

// Overwrite core method
Window_ActorCommand.prototype.addItemCommand = function () {
  this.addCommand(TextManager.item, 'item', !$gameSwitches.value(ThinkN.N_BattleCommandsDisableSwitch.ItemSwitch));
};