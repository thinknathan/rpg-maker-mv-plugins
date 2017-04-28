/*:
 * @plugindesc N1.00 (Requires YEP_JobPoints, YEP_ClassChangeCore, FoxJPLevels, YEP_VictoryAftermath)
 * @author Yanfly, ThinkNathan

 * @help Skills learned by Jp Level will show up in YEP_VictoryAftermath.

 * Requires YEP_JobPoints, YEP_ClassChangeCore, FoxJPLevels, YEP_VictoryAftermath
 * Put this plugin BELOW all other plugins
 */

var Imported = Imported || {};
Imported.N_X_LearnSkillsByJPLevelAftermath = true;

// Overwrite Yanfly method from YEP_VictoryAftermath
// Removed awarding Jp at this stage; will be added back in another method
BattleManager.makeRewards = function () {
  Yanfly.JP.BattleManager_makeRewards.call(this);
  this._rewards.jp = $gameTroop.jpTotal();
  //  this.gainJp();
};

// Alias Yanfly method from YEP_VictoryAftermath
// Award Jp here
BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function () {
  BattleManager_gainRewards.call(this);
  var jp = $gameTroop.jpTotal();
  if (Yanfly.Param.JpAliveActors) {
    var members = $gameParty.aliveMembers();
  } else {
    var members = $gameParty.members();
  }
  members.forEach(function (actor) {
    actor.gainJp(jp);
  }, this);
};

// Overwrite Yanfly method from YEP_JobPoints
// Adds call to methods below
Window_VictoryJp.prototype.drawActorGauge = function (actor, index) {
  this.clearGaugeRect(index);
  var rect = this.gaugeRect(index);
  rect.width *= 0.80;
  this.changeTextColor(this.normalColor());
  this.drawActorName(actor, rect.x + 2, rect.y);
  this.drawJpLevel(actor, rect);
  this.drawJpGained(actor, rect);
  this.drawGainedSkillsJp(actor, rect);
};

// New method
// Draws current class name and current Jp level
Window_VictoryJp.prototype.drawJpLevel = function (actor, rect) {
  this.changeTextColor(this.normalColor());
  var text = 'LV ' + Yanfly.Util.toGroup(actor.jpLevel(actor._classId));
  this.drawText(text, rect.x + 2, rect.y, rect.width - 4, 'right');
  var ww = rect.width - 4 - this.textWidth(text + '1');
  //this.changeTextColor(this.systemColor());
  this.drawText(actor.currentClass().name, rect.x + 2, rect.y, ww, 'right');
};

// New method
// Draws skills learned by Jp level up
Window_VictoryJp.prototype.drawGainedSkillsJp = function (actor, rect) {
  if (actor._victorySkills.length <= 0) return;
  var wy = rect.y;
  var wx = rect.x + (rect.width) + 32;
  this.changeTextColor(this.systemColor());
  this.drawText('Learned', wx, wy, rect.width);

  wy = rect.y + this.lineHeight();

  for (var i = 0; i < actor._victorySkills.length; ++i) {
    if (wy + this.lineHeight() > rect.y + rect.height) break;
    var skillId = actor._victorySkills[i];
    var skill = $dataSkills[skillId];
    if (!skill) continue;
    var text = '\\i[' + skill.iconIndex + ']' + skill.name;
    //text = TextManager.obtainSkill.format(text);
    var ww = this.textWidthEx(text);
    var wx = rect.x + (rect.width);
    this.drawTextEx(text, wx, wy);
    wy += this.lineHeight();
  }
}