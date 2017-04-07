/*:
 * @plugindesc N1.00 Changes the black and white colour used in engine.
 * @author ThinkNathan

 * @param Black Colour
 * @desc RGB parameters for black colour.
 * (Red, Green, Blue)
 * @default (59, 64, 67)
 
 * @param White Colour
 * @desc RGB parameters for white colour.
 * (Red, Green, Blue)
 * @default (255, 255, 243)

 * @help Changes the black and white colour used in engine.
 */

var Imported = Imported || {};
Imported.N_DefineBlackAndWhite = true;

var ThinkN = ThinkN || {};
ThinkN.N_DefineBlackAndWhite = ThinkN.N_DefineBlackAndWhite || {};

ThinkN.N_DefineBlackAndWhite.Black = String(PluginManager.parameters('N_DefineBlackAndWhite')['Black Colour']);
ThinkN.N_DefineBlackAndWhite.White = String(PluginManager.parameters('N_DefineBlackAndWhite')['White Colour']);
ThinkN.N_DefineBlackAndWhite.BlackArray = ThinkN.N_DefineBlackAndWhite.Black.split(',');
ThinkN.N_DefineBlackAndWhite.WhiteArray = ThinkN.N_DefineBlackAndWhite.White.split(',');

// Overwrite core method
ScreenSprite.prototype.setBlack = function () {
  this.setColor(Number(ThinkN.N_DefineBlackAndWhite.BlackArray[0]), Number(ThinkN.N_DefineBlackAndWhite.BlackArray[1]), Number(ThinkN.N_DefineBlackAndWhite.BlackArray[2]));
};

// Overwrite core method
ScreenSprite.prototype.setWhite = function () {
  this.setColor(Number(ThinkN.N_DefineBlackAndWhite.WhiteArray[0]), Number(ThinkN.N_DefineBlackAndWhite.WhiteArray[1]), Number(ThinkN.N_DefineBlackAndWhite.WhiteArray[2]));
};

// Overwrite core method
Window_Base.prototype.dimColor1 = function () {
  return 'rgba(' + ThinkN.N_DefineBlackAndWhite.Black + ', 1)';
};

// Overwrite core method
Window_Base.prototype.dimColor2 = function () {
  return 'rgba(' + ThinkN.N_DefineBlackAndWhite.Black + ', 1)';
};

// New method
(function () {
  var body = document.getElementsByTagName('body')[0];
  body.style.backgroundColor = 'rgb(' + ThinkN.N_DefineBlackAndWhite.Black + ')';
})();