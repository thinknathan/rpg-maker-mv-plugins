/*:
 * @plugindesc N1.00 Makes rain wider
 * @author ThinkNathan
 
 * @param Rain Width
 * @desc Width of rain in pixels.
 * @default 3

 * @help Makes the default rain wider to fit a thicker pixel aethetic.
 */

var Imported = Imported || {};
Imported.N_FatterRain = true;

var ThinkN = ThinkN || {};
ThinkN.N_FatterRain = ThinkN.N_FatterRain || {};

ThinkN.N_FatterRain.Fatness = Number(PluginManager.parameters('N_FatterRain')['Rain Width']);

// Overwrite core method
Weather.prototype._createBitmaps = function () {
  // Changed value
  this._rainBitmap = new Bitmap(ThinkN.N_EscapeRatio.Fatness, 70);
  this._rainBitmap.fillAll('white');
  // Changed value
  this._stormBitmap = new Bitmap(ThinkN.N_EscapeRatio.Fatness, 100);
  this._stormBitmap.fillAll('white');
  this._snowBitmap = new Bitmap(9, 9);
  this._snowBitmap.drawCircle(4, 4, 4, 'white');
};