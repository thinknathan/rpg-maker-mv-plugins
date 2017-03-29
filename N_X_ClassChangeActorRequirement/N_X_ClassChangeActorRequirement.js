/*:
 * @plugindesc N1.00 (Requires YEP_ClassChangeCore) Allows you to specify actor ID in class unlock requirements
 * @author ThinkNathan

 * @help Requires YEP_ClassChangeCore & optionally FoxJPLevels
 * Usage: <actor unlock requirements>
 *          actorId: 1
 *        </actor unlock requirements>
 */

var Imported = Imported || {};
Imported.N_X_ClassChangeActorRequirement = true;

(function () {
  // Alias method from YEP_ClassChangeCore
  var DataManager_processCCCNotetags3_Original = DataManager.processCCCNotetags3;
  DataManager.processCCCNotetags3 = function (group) {
    DataManager_processCCCNotetags3_Original.call(this, group);
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);
      obj.actorUnlockRequirements = {};
      var evalMode = 'none';
      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<(?:ACTOR UNLOCK REQUIREMENTS)>/i)) {
          evalMode = 'actor unlock requirements';
        } else if (line.match(/<\/(?:ACTOR UNLOCK REQUIREMENTS)>/i)) {
          evalMode = 'none';
        } else if (evalMode === 'actor unlock requirements') {
          if (line.match(/ACTORID:[ ](\d+)/i)) {
            var actorId = parseInt(RegExp.$1);
            obj.actorUnlockRequirements[actorId] = actorId;
          }
        }
      }
    }
  };
  // Alias method from YEP_ClassChangeCore
  var Game_Actor_classUnlockLevelRequirementsMet = Game_Actor.prototype.classUnlockLevelRequirementsMet;
  Game_Actor.prototype.classUnlockLevelRequirementsMet = function (item) {
    var actorId;
    for (actorId in item.actorUnlockRequirements) {
      var arrId = item.actorUnlockRequirements[actorId];
      if (this._actorId != arrId) return false;
    }
    Game_Actor_classUnlockLevelRequirementsMet.call(this, item);
  };
  // Overwrite method from Fox JPLevels
  Game_Actor.prototype.checkJobLevelUnlockedClass = function (item) {
    var intentToReturn = true;
    for (var classId in item.levelUnlockRequirements2) {
      var level = item.levelUnlockRequirements2[classId];
      if (this.jpLevel(classId) >= level) {
        intentToReturn = true;
      } else {
        intentToReturn = false;
      }
    }
    // Added
    for (var actorId in item.actorUnlockRequirements) {
      var arrId = item.actorUnlockRequirements[actorId];
      if (this._actorId != arrId) {
        intentToReturn = false;
      }
    }
    return intentToReturn;
  }
})();