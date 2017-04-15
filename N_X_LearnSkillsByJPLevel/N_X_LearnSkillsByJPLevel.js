/*:
 * @plugindesc N1.00 (Requires YEP_JobPoints, YEP_ClassChangeCore, FoxJPLevels) Learn skills by JP level
 * @author Yanfly, ThinkNathan

 * @help Learn skills based on JP level.

 * Requires YEP_JobPoints, YEP_ClassChangeCore, FoxJPLevels
 * Optionally, YEP_VictoryAftermath
 * Put this plugin BELOW all other plugins
 */

var Imported = Imported || {};
Imported.N_X_LearnSkillsByJPLevel = true;

// Alias existing method from FoxJPLevels
// Adds call to method below each time an actor gains a job level
Game_Actor_gainJp = Game_Actor.prototype.gainJp;
Game_Actor.prototype.gainJp = function (value, classId) {
  Game_Actor_gainJp.call(this, value, classId);
  this.jpLearnSkills(classId);
}

// New method
// Tweak to the default learning system to check for job level instead of base level
Game_Actor.prototype.jpLearnSkills = function (classId) {
  this.currentClass().learnings.forEach(function (learning) {
    if (this.jpLevel(classId) >= learning.level) {
      this.learnSkill(learning.skillId);
    }
  }, this);
}

// Overwrite Yanfly method from YEP_ClassChangeCore
// Tweak to the default learning system to check for job level instead of base level
// Runs when changing classes
Game_Actor.prototype.updateLearnedSkills = function (classId) {
  if (!Fox && !Fox.JPLevels) return;
  if (!$dataClasses[classId]) return;
  $dataClasses[classId].learnings.forEach(function (learning) {
    if (this.jpLevel(classId) >= learning.level) {
      this.learnSkill(learning.skillId);
    }
  }, this);
};