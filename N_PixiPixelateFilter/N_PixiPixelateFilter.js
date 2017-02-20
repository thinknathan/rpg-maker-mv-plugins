/*:
 * @plugindesc v1.0.6 Pixelate filter for Pixi v4.
 * @author ThinkNathan, jeff-gold-marblemedia, pixi-filters
 * @help
 *  pixi-filters https://github.com/pixijs/pixi-filters
 *  Developers can make use of the filter like so:
 *  var filter = new PIXI.filters.PixelateFilter();
 *  filter.pixelSize = 50;
 */

var Imported = Imported || {};
Imported.N_PixiPixelateFilter = true;

/*!
 * pixi-filters - v1.0.6
 * Compiled Wed Aug 31 2016 08:40:25 GMT-0400 (EDT)
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f()
  } else if (typeof define === "function" && define.amd) {
    define([], f)
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window
    } else if (typeof global !== "undefined") {
      g = global
    } else if (typeof self !== "undefined") {
      g = self
    } else {
      g = this
    }
    g.filters = f()
  }
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e)
        }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
  })({
    8: [function (require, module, exports) {
      // @see https://github.com/substack/brfs/issues/25

      /**
       * This filter applies a pixelate effect making display objects appear 'blocky'.
       *
       * @class
       * @extends PIXI.AbstractFilter
       * @memberof PIXI.filters
       */
      function PixelateFilter() {
        PIXI.Filter.call(this,
          // vertex shader
          "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
          // fragment shader
          "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color;\n\n}"
        );
        this.pixelSize = 4;
      }

      PixelateFilter.prototype = Object.create(PIXI.Filter.prototype);
      PixelateFilter.prototype.constructor = PixelateFilter;
      module.exports = PixelateFilter;

      Object.defineProperties(PixelateFilter.prototype, {
        /**
         * This a point that describes the size of the blocks.
         * x is the width of the block and y is the height.
         *
         * @member {PIXI.Point}
         * @memberof PIXI.filters.PixelateFilter#
         */
        pixelSize: {
          get: function () {
            return this.uniforms.pixelSize;
          },
          set: function (value) {
            this.uniforms.pixelSize = value;
          }
        }
      });

}, {}],
    16: [function (require, module, exports) {

      // Require built filters
      var filters = {
        PixelateFilter: require('./pixelate/PixelateFilter')
      };

      // Assign to filters
      Object.assign(PIXI.filters, filters);

      // Export for requiring
      if (typeof module !== 'undefined' && module.exports) {
        module.exports = filters;
      }
}, {
      "./pixelate/PixelateFilter": 8
}]
  }, {}, [16])(16)
});