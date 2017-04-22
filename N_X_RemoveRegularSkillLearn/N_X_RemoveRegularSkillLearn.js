/*:
 * @plugindesc N1.00 (Requires YEP_JobPoints, FoxJPLevels) Don't learn skills by level
 * @author ThinkNathan

 * @help Overwrites the default methods so they don't
 * give you skills based on regular level up.

 * Requires YEP_JobPoints, FoxJPLevels
 * Put this plugin ABOVE all other plugins
 */

var Imported = Imported || {};
Imported.N_X_RemoveRegularSkillLearn = true;

// Nukes the default way skills are learned
Game_Actor.prototype.levelUp = function () {
  this._level++;
};

// Changes default skillset to be based on job level
Game_Actor.prototype.initSkills = function () {
  if (!Fox.JPLevels) return;
  this._skills = [];
  this.currentClass().learnings.forEach(function (learning) {
    if (this.jpLevel(this._classId) >= learning.level) {
      this.learnSkill(learning.skillId);
    }
  }, this);
};