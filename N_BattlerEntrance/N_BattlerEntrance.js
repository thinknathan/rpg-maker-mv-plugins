/*:
 * @plugindesc N1.00 Customizes entrance animation of battlers.
 * @author ThinkNathan, Yanfly
 *
 * @help Adds variation in where party members start out from when they rush into battle.
 * Also makes enemies rush into battle.
 */

var Imported = Imported || {};
Imported.N_BattlerEntrance = true;

(function () {
  // Alias core method
  var Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
  Sprite_Enemy.prototype.initialize = function (battler) {
    Sprite_Enemy_initialize.call(this, battler);
    this.moveToStartPosition();
  };

  // New method
  Sprite_Enemy.prototype.moveToStartPosition = function () {
    this._initializingMovement = true;
    this._oldX = this._homeX;
    this._oldY = this._homeY;
    var winX = Math.floor(Graphics.boxWidth * 0.5);
    var randY = Math.randomInt(600) - 300;
    this._homeX = this._homeX - winX;
    this._homeY = this._homeY - randY;
    this.startMove(winX, randY, 30);
  }

  // New method
  Sprite_Enemy.prototype.onMoveEnd = function () {
    if (this._initializingMovement) {
      this._homeX = this._oldX;
      this._homeY = this._oldY;
      this.startMove(0, 0, 0);
      this._initializingMovement = false;
    }
  };

  // Overwrite core method + Yanfly edit
  Sprite_Actor.prototype.moveToStartPosition = function () {
    var winX = Math.floor(Graphics.boxWidth * 0.5);
    var randY = Math.randomInt(600) - 300;
    if (Imported.YEP_BattleEngineCore) {
      if (BattleManager._bypassMoveToStartLocation) return;
      if ($gameSystem.isSideView() && this._checkAliveStatus) {
        this.startMove(winX, randY, 0);
      }
    } else {
      this.startMove(winX, randY, 0);
    }
  };
})();