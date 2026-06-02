var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/double-indexed-kv.js
var require_double_indexed_kv = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/double-indexed-kv.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.DoubleIndexedKV = void 0;
    var DoubleIndexedKV = (
      /** @class */
      (function() {
        function DoubleIndexedKV2() {
          this.keyToValue = /* @__PURE__ */ new Map();
          this.valueToKey = /* @__PURE__ */ new Map();
        }
        DoubleIndexedKV2.prototype.set = function(key, value) {
          this.keyToValue.set(key, value);
          this.valueToKey.set(value, key);
        };
        DoubleIndexedKV2.prototype.getByKey = function(key) {
          return this.keyToValue.get(key);
        };
        DoubleIndexedKV2.prototype.getByValue = function(value) {
          return this.valueToKey.get(value);
        };
        DoubleIndexedKV2.prototype.clear = function() {
          this.keyToValue.clear();
          this.valueToKey.clear();
        };
        return DoubleIndexedKV2;
      })()
    );
    exports.DoubleIndexedKV = DoubleIndexedKV;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/registry.js
var require_registry = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/registry.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.Registry = void 0;
    var double_indexed_kv_1 = require_double_indexed_kv();
    var Registry = (
      /** @class */
      (function() {
        function Registry2(generateIdentifier) {
          this.generateIdentifier = generateIdentifier;
          this.kv = new double_indexed_kv_1.DoubleIndexedKV();
        }
        Registry2.prototype.register = function(value, identifier) {
          if (this.kv.getByValue(value)) {
            return;
          }
          if (!identifier) {
            identifier = this.generateIdentifier(value);
          }
          this.kv.set(identifier, value);
        };
        Registry2.prototype.clear = function() {
          this.kv.clear();
        };
        Registry2.prototype.getIdentifier = function(value) {
          return this.kv.getByValue(value);
        };
        Registry2.prototype.getValue = function(identifier) {
          return this.kv.getByKey(identifier);
        };
        return Registry2;
      })()
    );
    exports.Registry = Registry;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/class-registry.js
var require_class_registry = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/class-registry.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    exports.__esModule = true;
    exports.ClassRegistry = void 0;
    var registry_1 = require_registry();
    var ClassRegistry = (
      /** @class */
      (function(_super) {
        __extends(ClassRegistry2, _super);
        function ClassRegistry2() {
          var _this = _super.call(this, function(c) {
            return c.name;
          }) || this;
          _this.classToAllowedProps = /* @__PURE__ */ new Map();
          return _this;
        }
        ClassRegistry2.prototype.register = function(value, options) {
          if (typeof options === "object") {
            if (options.allowProps) {
              this.classToAllowedProps.set(value, options.allowProps);
            }
            _super.prototype.register.call(this, value, options.identifier);
          } else {
            _super.prototype.register.call(this, value, options);
          }
        };
        ClassRegistry2.prototype.getAllowedProps = function(value) {
          return this.classToAllowedProps.get(value);
        };
        return ClassRegistry2;
      })(registry_1.Registry)
    );
    exports.ClassRegistry = ClassRegistry;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/util.js"(exports) {
    "use strict";
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    exports.__esModule = true;
    exports.findArr = exports.includes = exports.forEach = exports.find = void 0;
    function valuesOfObj(record) {
      if ("values" in Object) {
        return Object.values(record);
      }
      var values = [];
      for (var key in record) {
        if (record.hasOwnProperty(key)) {
          values.push(record[key]);
        }
      }
      return values;
    }
    function find(record, predicate) {
      var values = valuesOfObj(record);
      if ("find" in values) {
        return values.find(predicate);
      }
      var valuesNotNever = values;
      for (var i = 0; i < valuesNotNever.length; i++) {
        var value = valuesNotNever[i];
        if (predicate(value)) {
          return value;
        }
      }
      return void 0;
    }
    exports.find = find;
    function forEach(record, run) {
      Object.entries(record).forEach(function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return run(value, key);
      });
    }
    exports.forEach = forEach;
    function includes(arr, value) {
      return arr.indexOf(value) !== -1;
    }
    exports.includes = includes;
    function findArr(record, predicate) {
      for (var i = 0; i < record.length; i++) {
        var value = record[i];
        if (predicate(value)) {
          return value;
        }
      }
      return void 0;
    }
    exports.findArr = findArr;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/custom-transformer-registry.js
var require_custom_transformer_registry = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/custom-transformer-registry.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.CustomTransformerRegistry = void 0;
    var util_1 = require_util();
    var CustomTransformerRegistry = (
      /** @class */
      (function() {
        function CustomTransformerRegistry2() {
          this.transfomers = {};
        }
        CustomTransformerRegistry2.prototype.register = function(transformer) {
          this.transfomers[transformer.name] = transformer;
        };
        CustomTransformerRegistry2.prototype.findApplicable = function(v) {
          return util_1.find(this.transfomers, function(transformer) {
            return transformer.isApplicable(v);
          });
        };
        CustomTransformerRegistry2.prototype.findByName = function(name) {
          return this.transfomers[name];
        };
        return CustomTransformerRegistry2;
      })()
    );
    exports.CustomTransformerRegistry = CustomTransformerRegistry;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/is.js
var require_is = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/is.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.isURL = exports.isTypedArray = exports.isInfinite = exports.isBigint = exports.isPrimitive = exports.isNaNValue = exports.isError = exports.isDate = exports.isSymbol = exports.isSet = exports.isMap = exports.isRegExp = exports.isBoolean = exports.isNumber = exports.isString = exports.isArray = exports.isEmptyObject = exports.isPlainObject = exports.isNull = exports.isUndefined = void 0;
    var getType = function(payload) {
      return Object.prototype.toString.call(payload).slice(8, -1);
    };
    var isUndefined = function(payload) {
      return typeof payload === "undefined";
    };
    exports.isUndefined = isUndefined;
    var isNull = function(payload) {
      return payload === null;
    };
    exports.isNull = isNull;
    var isPlainObject = function(payload) {
      if (typeof payload !== "object" || payload === null)
        return false;
      if (payload === Object.prototype)
        return false;
      if (Object.getPrototypeOf(payload) === null)
        return true;
      return Object.getPrototypeOf(payload) === Object.prototype;
    };
    exports.isPlainObject = isPlainObject;
    var isEmptyObject = function(payload) {
      return exports.isPlainObject(payload) && Object.keys(payload).length === 0;
    };
    exports.isEmptyObject = isEmptyObject;
    var isArray = function(payload) {
      return Array.isArray(payload);
    };
    exports.isArray = isArray;
    var isString = function(payload) {
      return typeof payload === "string";
    };
    exports.isString = isString;
    var isNumber = function(payload) {
      return typeof payload === "number" && !isNaN(payload);
    };
    exports.isNumber = isNumber;
    var isBoolean = function(payload) {
      return typeof payload === "boolean";
    };
    exports.isBoolean = isBoolean;
    var isRegExp = function(payload) {
      return payload instanceof RegExp;
    };
    exports.isRegExp = isRegExp;
    var isMap = function(payload) {
      return payload instanceof Map;
    };
    exports.isMap = isMap;
    var isSet = function(payload) {
      return payload instanceof Set;
    };
    exports.isSet = isSet;
    var isSymbol = function(payload) {
      return getType(payload) === "Symbol";
    };
    exports.isSymbol = isSymbol;
    var isDate = function(payload) {
      return payload instanceof Date && !isNaN(payload.valueOf());
    };
    exports.isDate = isDate;
    var isError = function(payload) {
      return payload instanceof Error;
    };
    exports.isError = isError;
    var isNaNValue = function(payload) {
      return typeof payload === "number" && isNaN(payload);
    };
    exports.isNaNValue = isNaNValue;
    var isPrimitive = function(payload) {
      return exports.isBoolean(payload) || exports.isNull(payload) || exports.isUndefined(payload) || exports.isNumber(payload) || exports.isString(payload) || exports.isSymbol(payload);
    };
    exports.isPrimitive = isPrimitive;
    var isBigint = function(payload) {
      return typeof payload === "bigint";
    };
    exports.isBigint = isBigint;
    var isInfinite = function(payload) {
      return payload === Infinity || payload === -Infinity;
    };
    exports.isInfinite = isInfinite;
    var isTypedArray = function(payload) {
      return ArrayBuffer.isView(payload) && !(payload instanceof DataView);
    };
    exports.isTypedArray = isTypedArray;
    var isURL = function(payload) {
      return payload instanceof URL;
    };
    exports.isURL = isURL;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/pathstringifier.js
var require_pathstringifier = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/pathstringifier.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.parsePath = exports.stringifyPath = exports.escapeKey = void 0;
    var escapeKey = function(key) {
      return key.replace(/\./g, "\\.");
    };
    exports.escapeKey = escapeKey;
    var stringifyPath = function(path) {
      return path.map(String).map(exports.escapeKey).join(".");
    };
    exports.stringifyPath = stringifyPath;
    var parsePath = function(string) {
      var result = [];
      var segment = "";
      for (var i = 0; i < string.length; i++) {
        var char = string.charAt(i);
        var isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
        if (isEscapedDot) {
          segment += ".";
          i++;
          continue;
        }
        var isEndOfSegment = char === ".";
        if (isEndOfSegment) {
          result.push(segment);
          segment = "";
          continue;
        }
        segment += char;
      }
      var lastSegment = segment;
      result.push(lastSegment);
      return result;
    };
    exports.parsePath = parsePath;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/transformer.js
var require_transformer = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/transformer.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t2[p] = s[p];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    exports.__esModule = true;
    exports.untransformValue = exports.transformValue = exports.isInstanceOfRegisteredClass = void 0;
    var is_1 = require_is();
    var util_1 = require_util();
    function simpleTransformation(isApplicable, annotation, transform, untransform) {
      return {
        isApplicable,
        annotation,
        transform,
        untransform
      };
    }
    var simpleRules = [
      simpleTransformation(is_1.isUndefined, "undefined", function() {
        return null;
      }, function() {
        return void 0;
      }),
      simpleTransformation(is_1.isBigint, "bigint", function(v) {
        return v.toString();
      }, function(v) {
        if (typeof BigInt !== "undefined") {
          return BigInt(v);
        }
        console.error("Please add a BigInt polyfill.");
        return v;
      }),
      simpleTransformation(is_1.isDate, "Date", function(v) {
        return v.toISOString();
      }, function(v) {
        return new Date(v);
      }),
      simpleTransformation(is_1.isError, "Error", function(v, superJson) {
        var baseError = {
          name: v.name,
          message: v.message
        };
        superJson.allowedErrorProps.forEach(function(prop) {
          baseError[prop] = v[prop];
        });
        return baseError;
      }, function(v, superJson) {
        var e = new Error(v.message);
        e.name = v.name;
        e.stack = v.stack;
        superJson.allowedErrorProps.forEach(function(prop) {
          e[prop] = v[prop];
        });
        return e;
      }),
      simpleTransformation(is_1.isRegExp, "regexp", function(v) {
        return "" + v;
      }, function(regex) {
        var body = regex.slice(1, regex.lastIndexOf("/"));
        var flags = regex.slice(regex.lastIndexOf("/") + 1);
        return new RegExp(body, flags);
      }),
      simpleTransformation(
        is_1.isSet,
        "set",
        // (sets only exist in es6+)
        // eslint-disable-next-line es5/no-es6-methods
        function(v) {
          return __spreadArray([], __read(v.values()));
        },
        function(v) {
          return new Set(v);
        }
      ),
      simpleTransformation(is_1.isMap, "map", function(v) {
        return __spreadArray([], __read(v.entries()));
      }, function(v) {
        return new Map(v);
      }),
      simpleTransformation(function(v) {
        return is_1.isNaNValue(v) || is_1.isInfinite(v);
      }, "number", function(v) {
        if (is_1.isNaNValue(v)) {
          return "NaN";
        }
        if (v > 0) {
          return "Infinity";
        } else {
          return "-Infinity";
        }
      }, Number),
      simpleTransformation(function(v) {
        return v === 0 && 1 / v === -Infinity;
      }, "number", function() {
        return "-0";
      }, Number),
      simpleTransformation(is_1.isURL, "URL", function(v) {
        return v.toString();
      }, function(v) {
        return new URL(v);
      })
    ];
    function compositeTransformation(isApplicable, annotation, transform, untransform) {
      return {
        isApplicable,
        annotation,
        transform,
        untransform
      };
    }
    var symbolRule = compositeTransformation(function(s, superJson) {
      if (is_1.isSymbol(s)) {
        var isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
        return isRegistered;
      }
      return false;
    }, function(s, superJson) {
      var identifier = superJson.symbolRegistry.getIdentifier(s);
      return ["symbol", identifier];
    }, function(v) {
      return v.description;
    }, function(_, a, superJson) {
      var value = superJson.symbolRegistry.getValue(a[1]);
      if (!value) {
        throw new Error("Trying to deserialize unknown symbol");
      }
      return value;
    });
    var constructorToName = [
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
      Uint8ClampedArray
    ].reduce(function(obj, ctor) {
      obj[ctor.name] = ctor;
      return obj;
    }, {});
    var typedArrayRule = compositeTransformation(is_1.isTypedArray, function(v) {
      return ["typed-array", v.constructor.name];
    }, function(v) {
      return __spreadArray([], __read(v));
    }, function(v, a) {
      var ctor = constructorToName[a[1]];
      if (!ctor) {
        throw new Error("Trying to deserialize unknown typed array");
      }
      return new ctor(v);
    });
    function isInstanceOfRegisteredClass(potentialClass, superJson) {
      if (potentialClass === null || potentialClass === void 0 ? void 0 : potentialClass.constructor) {
        var isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
        return isRegistered;
      }
      return false;
    }
    exports.isInstanceOfRegisteredClass = isInstanceOfRegisteredClass;
    var classRule = compositeTransformation(isInstanceOfRegisteredClass, function(clazz, superJson) {
      var identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
      return ["class", identifier];
    }, function(clazz, superJson) {
      var allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
      if (!allowedProps) {
        return __assign({}, clazz);
      }
      var result = {};
      allowedProps.forEach(function(prop) {
        result[prop] = clazz[prop];
      });
      return result;
    }, function(v, a, superJson) {
      var clazz = superJson.classRegistry.getValue(a[1]);
      if (!clazz) {
        throw new Error("Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564");
      }
      return Object.assign(Object.create(clazz.prototype), v);
    });
    var customRule = compositeTransformation(function(value, superJson) {
      return !!superJson.customTransformerRegistry.findApplicable(value);
    }, function(value, superJson) {
      var transformer = superJson.customTransformerRegistry.findApplicable(value);
      return ["custom", transformer.name];
    }, function(value, superJson) {
      var transformer = superJson.customTransformerRegistry.findApplicable(value);
      return transformer.serialize(value);
    }, function(v, a, superJson) {
      var transformer = superJson.customTransformerRegistry.findByName(a[1]);
      if (!transformer) {
        throw new Error("Trying to deserialize unknown custom value");
      }
      return transformer.deserialize(v);
    });
    var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
    var transformValue = function(value, superJson) {
      var applicableCompositeRule = util_1.findArr(compositeRules, function(rule) {
        return rule.isApplicable(value, superJson);
      });
      if (applicableCompositeRule) {
        return {
          value: applicableCompositeRule.transform(value, superJson),
          type: applicableCompositeRule.annotation(value, superJson)
        };
      }
      var applicableSimpleRule = util_1.findArr(simpleRules, function(rule) {
        return rule.isApplicable(value, superJson);
      });
      if (applicableSimpleRule) {
        return {
          value: applicableSimpleRule.transform(value, superJson),
          type: applicableSimpleRule.annotation
        };
      }
      return void 0;
    };
    exports.transformValue = transformValue;
    var simpleRulesByAnnotation = {};
    simpleRules.forEach(function(rule) {
      simpleRulesByAnnotation[rule.annotation] = rule;
    });
    var untransformValue = function(json, type, superJson) {
      if (is_1.isArray(type)) {
        switch (type[0]) {
          case "symbol":
            return symbolRule.untransform(json, type, superJson);
          case "class":
            return classRule.untransform(json, type, superJson);
          case "custom":
            return customRule.untransform(json, type, superJson);
          case "typed-array":
            return typedArrayRule.untransform(json, type, superJson);
          default:
            throw new Error("Unknown transformation: " + type);
        }
      } else {
        var transformation = simpleRulesByAnnotation[type];
        if (!transformation) {
          throw new Error("Unknown transformation: " + type);
        }
        return transformation.untransform(json, superJson);
      }
    };
    exports.untransformValue = untransformValue;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/accessDeep.js
var require_accessDeep = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/accessDeep.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.setDeep = exports.getDeep = void 0;
    var is_1 = require_is();
    var util_1 = require_util();
    var getNthKey = function(value, n) {
      var keys = value.keys();
      while (n > 0) {
        keys.next();
        n--;
      }
      return keys.next().value;
    };
    function validatePath(path) {
      if (util_1.includes(path, "__proto__")) {
        throw new Error("__proto__ is not allowed as a property");
      }
      if (util_1.includes(path, "prototype")) {
        throw new Error("prototype is not allowed as a property");
      }
      if (util_1.includes(path, "constructor")) {
        throw new Error("constructor is not allowed as a property");
      }
    }
    var getDeep = function(object, path) {
      validatePath(path);
      for (var i = 0; i < path.length; i++) {
        var key = path[i];
        if (is_1.isSet(object)) {
          object = getNthKey(object, +key);
        } else if (is_1.isMap(object)) {
          var row = +key;
          var type = +path[++i] === 0 ? "key" : "value";
          var keyOfRow = getNthKey(object, row);
          switch (type) {
            case "key":
              object = keyOfRow;
              break;
            case "value":
              object = object.get(keyOfRow);
              break;
          }
        } else {
          object = object[key];
        }
      }
      return object;
    };
    exports.getDeep = getDeep;
    var setDeep = function(object, path, mapper) {
      validatePath(path);
      if (path.length === 0) {
        return mapper(object);
      }
      var parent = object;
      for (var i = 0; i < path.length - 1; i++) {
        var key = path[i];
        if (is_1.isArray(parent)) {
          var index = +key;
          parent = parent[index];
        } else if (is_1.isPlainObject(parent)) {
          parent = parent[key];
        } else if (is_1.isSet(parent)) {
          var row = +key;
          parent = getNthKey(parent, row);
        } else if (is_1.isMap(parent)) {
          var isEnd = i === path.length - 2;
          if (isEnd) {
            break;
          }
          var row = +key;
          var type = +path[++i] === 0 ? "key" : "value";
          var keyOfRow = getNthKey(parent, row);
          switch (type) {
            case "key":
              parent = keyOfRow;
              break;
            case "value":
              parent = parent.get(keyOfRow);
              break;
          }
        }
      }
      var lastKey = path[path.length - 1];
      if (is_1.isArray(parent)) {
        parent[+lastKey] = mapper(parent[+lastKey]);
      } else if (is_1.isPlainObject(parent)) {
        parent[lastKey] = mapper(parent[lastKey]);
      }
      if (is_1.isSet(parent)) {
        var oldValue = getNthKey(parent, +lastKey);
        var newValue = mapper(oldValue);
        if (oldValue !== newValue) {
          parent["delete"](oldValue);
          parent.add(newValue);
        }
      }
      if (is_1.isMap(parent)) {
        var row = +path[path.length - 2];
        var keyToRow = getNthKey(parent, row);
        var type = +lastKey === 0 ? "key" : "value";
        switch (type) {
          case "key": {
            var newKey = mapper(keyToRow);
            parent.set(newKey, parent.get(keyToRow));
            if (newKey !== keyToRow) {
              parent["delete"](keyToRow);
            }
            break;
          }
          case "value": {
            parent.set(keyToRow, mapper(parent.get(keyToRow)));
            break;
          }
        }
      }
      return object;
    };
    exports.setDeep = setDeep;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/plainer.js
var require_plainer = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/plainer.js"(exports) {
    "use strict";
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    exports.__esModule = true;
    exports.walker = exports.generateReferentialEqualityAnnotations = exports.applyReferentialEqualityAnnotations = exports.applyValueAnnotations = void 0;
    var is_1 = require_is();
    var pathstringifier_1 = require_pathstringifier();
    var transformer_1 = require_transformer();
    var util_1 = require_util();
    var pathstringifier_2 = require_pathstringifier();
    var accessDeep_1 = require_accessDeep();
    function traverse(tree, walker2, origin) {
      if (origin === void 0) {
        origin = [];
      }
      if (!tree) {
        return;
      }
      if (!is_1.isArray(tree)) {
        util_1.forEach(tree, function(subtree, key) {
          return traverse(subtree, walker2, __spreadArray(__spreadArray([], __read(origin)), __read(pathstringifier_2.parsePath(key))));
        });
        return;
      }
      var _a = __read(tree, 2), nodeValue = _a[0], children = _a[1];
      if (children) {
        util_1.forEach(children, function(child, key) {
          traverse(child, walker2, __spreadArray(__spreadArray([], __read(origin)), __read(pathstringifier_2.parsePath(key))));
        });
      }
      walker2(nodeValue, origin);
    }
    function applyValueAnnotations(plain, annotations, superJson) {
      traverse(annotations, function(type, path) {
        plain = accessDeep_1.setDeep(plain, path, function(v) {
          return transformer_1.untransformValue(v, type, superJson);
        });
      });
      return plain;
    }
    exports.applyValueAnnotations = applyValueAnnotations;
    function applyReferentialEqualityAnnotations(plain, annotations) {
      function apply(identicalPaths, path) {
        var object = accessDeep_1.getDeep(plain, pathstringifier_2.parsePath(path));
        identicalPaths.map(pathstringifier_2.parsePath).forEach(function(identicalObjectPath) {
          plain = accessDeep_1.setDeep(plain, identicalObjectPath, function() {
            return object;
          });
        });
      }
      if (is_1.isArray(annotations)) {
        var _a = __read(annotations, 2), root = _a[0], other = _a[1];
        root.forEach(function(identicalPath) {
          plain = accessDeep_1.setDeep(plain, pathstringifier_2.parsePath(identicalPath), function() {
            return plain;
          });
        });
        if (other) {
          util_1.forEach(other, apply);
        }
      } else {
        util_1.forEach(annotations, apply);
      }
      return plain;
    }
    exports.applyReferentialEqualityAnnotations = applyReferentialEqualityAnnotations;
    var isDeep = function(object, superJson) {
      return is_1.isPlainObject(object) || is_1.isArray(object) || is_1.isMap(object) || is_1.isSet(object) || transformer_1.isInstanceOfRegisteredClass(object, superJson);
    };
    function addIdentity(object, path, identities) {
      var existingSet = identities.get(object);
      if (existingSet) {
        existingSet.push(path);
      } else {
        identities.set(object, [path]);
      }
    }
    function generateReferentialEqualityAnnotations(identitites, dedupe) {
      var result = {};
      var rootEqualityPaths = void 0;
      identitites.forEach(function(paths) {
        if (paths.length <= 1) {
          return;
        }
        if (!dedupe) {
          paths = paths.map(function(path) {
            return path.map(String);
          }).sort(function(a, b) {
            return a.length - b.length;
          });
        }
        var _a = __read(paths), representativePath = _a[0], identicalPaths = _a.slice(1);
        if (representativePath.length === 0) {
          rootEqualityPaths = identicalPaths.map(pathstringifier_1.stringifyPath);
        } else {
          result[pathstringifier_1.stringifyPath(representativePath)] = identicalPaths.map(pathstringifier_1.stringifyPath);
        }
      });
      if (rootEqualityPaths) {
        if (is_1.isEmptyObject(result)) {
          return [rootEqualityPaths];
        } else {
          return [rootEqualityPaths, result];
        }
      } else {
        return is_1.isEmptyObject(result) ? void 0 : result;
      }
    }
    exports.generateReferentialEqualityAnnotations = generateReferentialEqualityAnnotations;
    var walker = function(object, identities, superJson, dedupe, path, objectsInThisPath, seenObjects) {
      var _a;
      if (path === void 0) {
        path = [];
      }
      if (objectsInThisPath === void 0) {
        objectsInThisPath = [];
      }
      if (seenObjects === void 0) {
        seenObjects = /* @__PURE__ */ new Map();
      }
      var primitive = is_1.isPrimitive(object);
      if (!primitive) {
        addIdentity(object, path, identities);
        var seen = seenObjects.get(object);
        if (seen) {
          return dedupe ? {
            transformedValue: null
          } : seen;
        }
      }
      if (!isDeep(object, superJson)) {
        var transformed_1 = transformer_1.transformValue(object, superJson);
        var result_1 = transformed_1 ? {
          transformedValue: transformed_1.value,
          annotations: [transformed_1.type]
        } : {
          transformedValue: object
        };
        if (!primitive) {
          seenObjects.set(object, result_1);
        }
        return result_1;
      }
      if (util_1.includes(objectsInThisPath, object)) {
        return {
          transformedValue: null
        };
      }
      var transformationResult = transformer_1.transformValue(object, superJson);
      var transformed = (_a = transformationResult === null || transformationResult === void 0 ? void 0 : transformationResult.value) !== null && _a !== void 0 ? _a : object;
      var transformedValue = is_1.isArray(transformed) ? [] : {};
      var innerAnnotations = {};
      util_1.forEach(transformed, function(value, index) {
        var recursiveResult = exports.walker(value, identities, superJson, dedupe, __spreadArray(__spreadArray([], __read(path)), [index]), __spreadArray(__spreadArray([], __read(objectsInThisPath)), [object]), seenObjects);
        transformedValue[index] = recursiveResult.transformedValue;
        if (is_1.isArray(recursiveResult.annotations)) {
          innerAnnotations[index] = recursiveResult.annotations;
        } else if (is_1.isPlainObject(recursiveResult.annotations)) {
          util_1.forEach(recursiveResult.annotations, function(tree, key) {
            innerAnnotations[pathstringifier_1.escapeKey(index) + "." + key] = tree;
          });
        }
      });
      var result = is_1.isEmptyObject(innerAnnotations) ? {
        transformedValue,
        annotations: !!transformationResult ? [transformationResult.type] : void 0
      } : {
        transformedValue,
        annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
      };
      if (!primitive) {
        seenObjects.set(object, result);
      }
      return result;
    };
    exports.walker = walker;
  }
});

// node_modules/.pnpm/is-what@4.1.16/node_modules/is-what/dist/cjs/index.cjs
var require_cjs = __commonJS({
  "node_modules/.pnpm/is-what@4.1.16/node_modules/is-what/dist/cjs/index.cjs"(exports) {
    "use strict";
    function getType(payload) {
      return Object.prototype.toString.call(payload).slice(8, -1);
    }
    function isAnyObject(payload) {
      return getType(payload) === "Object";
    }
    function isArray(payload) {
      return getType(payload) === "Array";
    }
    function isBlob(payload) {
      return getType(payload) === "Blob";
    }
    function isBoolean(payload) {
      return getType(payload) === "Boolean";
    }
    function isDate(payload) {
      return getType(payload) === "Date" && !isNaN(payload);
    }
    function isEmptyArray(payload) {
      return isArray(payload) && payload.length === 0;
    }
    function isPlainObject(payload) {
      if (getType(payload) !== "Object")
        return false;
      const prototype = Object.getPrototypeOf(payload);
      return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
    }
    function isEmptyObject(payload) {
      return isPlainObject(payload) && Object.keys(payload).length === 0;
    }
    function isEmptyString(payload) {
      return payload === "";
    }
    function isError(payload) {
      return getType(payload) === "Error" || payload instanceof Error;
    }
    function isFile(payload) {
      return getType(payload) === "File";
    }
    function isFullArray(payload) {
      return isArray(payload) && payload.length > 0;
    }
    function isFullObject(payload) {
      return isPlainObject(payload) && Object.keys(payload).length > 0;
    }
    function isString(payload) {
      return getType(payload) === "String";
    }
    function isFullString(payload) {
      return isString(payload) && payload !== "";
    }
    function isFunction(payload) {
      return typeof payload === "function";
    }
    function isType(payload, type) {
      if (!(type instanceof Function)) {
        throw new TypeError("Type must be a function");
      }
      if (!Object.prototype.hasOwnProperty.call(type, "prototype")) {
        throw new TypeError("Type is not a class");
      }
      const name = type.name;
      return getType(payload) === name || Boolean(payload && payload.constructor === type);
    }
    function isInstanceOf(value, classOrClassName) {
      if (typeof classOrClassName === "function") {
        for (let p = value; p; p = Object.getPrototypeOf(p)) {
          if (isType(p, classOrClassName)) {
            return true;
          }
        }
        return false;
      } else {
        for (let p = value; p; p = Object.getPrototypeOf(p)) {
          if (getType(p) === classOrClassName) {
            return true;
          }
        }
        return false;
      }
    }
    function isMap(payload) {
      return getType(payload) === "Map";
    }
    function isNaNValue(payload) {
      return getType(payload) === "Number" && isNaN(payload);
    }
    function isNumber(payload) {
      return getType(payload) === "Number" && !isNaN(payload);
    }
    function isNegativeNumber(payload) {
      return isNumber(payload) && payload < 0;
    }
    function isNull(payload) {
      return getType(payload) === "Null";
    }
    function isOneOf(a, b, c, d, e) {
      return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
    }
    function isUndefined(payload) {
      return getType(payload) === "Undefined";
    }
    var isNullOrUndefined = isOneOf(isNull, isUndefined);
    function isObject(payload) {
      return isPlainObject(payload);
    }
    function isObjectLike2(payload) {
      return isAnyObject(payload);
    }
    function isPositiveNumber(payload) {
      return isNumber(payload) && payload > 0;
    }
    function isSymbol(payload) {
      return getType(payload) === "Symbol";
    }
    function isPrimitive(payload) {
      return isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
    }
    function isPromise(payload) {
      return getType(payload) === "Promise";
    }
    function isRegExp(payload) {
      return getType(payload) === "RegExp";
    }
    function isSet(payload) {
      return getType(payload) === "Set";
    }
    function isWeakMap(payload) {
      return getType(payload) === "WeakMap";
    }
    function isWeakSet(payload) {
      return getType(payload) === "WeakSet";
    }
    exports.getType = getType;
    exports.isAnyObject = isAnyObject;
    exports.isArray = isArray;
    exports.isBlob = isBlob;
    exports.isBoolean = isBoolean;
    exports.isDate = isDate;
    exports.isEmptyArray = isEmptyArray;
    exports.isEmptyObject = isEmptyObject;
    exports.isEmptyString = isEmptyString;
    exports.isError = isError;
    exports.isFile = isFile;
    exports.isFullArray = isFullArray;
    exports.isFullObject = isFullObject;
    exports.isFullString = isFullString;
    exports.isFunction = isFunction;
    exports.isInstanceOf = isInstanceOf;
    exports.isMap = isMap;
    exports.isNaNValue = isNaNValue;
    exports.isNegativeNumber = isNegativeNumber;
    exports.isNull = isNull;
    exports.isNullOrUndefined = isNullOrUndefined;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isObjectLike = isObjectLike2;
    exports.isOneOf = isOneOf;
    exports.isPlainObject = isPlainObject;
    exports.isPositiveNumber = isPositiveNumber;
    exports.isPrimitive = isPrimitive;
    exports.isPromise = isPromise;
    exports.isRegExp = isRegExp;
    exports.isSet = isSet;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isType = isType;
    exports.isUndefined = isUndefined;
    exports.isWeakMap = isWeakMap;
    exports.isWeakSet = isWeakSet;
  }
});

// node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/cjs/index.cjs
var require_cjs2 = __commonJS({
  "node_modules/.pnpm/copy-anything@3.0.5/node_modules/copy-anything/dist/cjs/index.cjs"(exports) {
    "use strict";
    var isWhat = require_cjs();
    function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
      const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
      if (propType === "enumerable")
        carry[key] = newVal;
      if (includeNonenumerable && propType === "nonenumerable") {
        Object.defineProperty(carry, key, {
          value: newVal,
          enumerable: false,
          writable: true,
          configurable: true
        });
      }
    }
    function copy(target, options = {}) {
      if (isWhat.isArray(target)) {
        return target.map((item) => copy(item, options));
      }
      if (!isWhat.isPlainObject(target)) {
        return target;
      }
      const props = Object.getOwnPropertyNames(target);
      const symbols = Object.getOwnPropertySymbols(target);
      return [...props, ...symbols].reduce((carry, key) => {
        if (isWhat.isArray(options.props) && !options.props.includes(key)) {
          return carry;
        }
        const val = target[key];
        const newVal = copy(val, options);
        assignProp(carry, key, newVal, target, options.nonenumerable);
        return carry;
      }, {});
    }
    exports.copy = copy;
  }
});

// node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/superjson@1.13.3/node_modules/superjson/dist/index.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t2[p] = s[p];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    exports.__esModule = true;
    exports.allowErrorProps = exports.registerSymbol = exports.registerCustom = exports.registerClass = exports.parse = exports.stringify = exports.deserialize = exports.serialize = exports.SuperJSON = void 0;
    var class_registry_1 = require_class_registry();
    var registry_1 = require_registry();
    var custom_transformer_registry_1 = require_custom_transformer_registry();
    var plainer_1 = require_plainer();
    var copy_anything_1 = require_cjs2();
    var SuperJSON = (
      /** @class */
      (function() {
        function SuperJSON2(_a) {
          var _b = _a === void 0 ? {} : _a, _c = _b.dedupe, dedupe = _c === void 0 ? false : _c;
          this.classRegistry = new class_registry_1.ClassRegistry();
          this.symbolRegistry = new registry_1.Registry(function(s) {
            var _a2;
            return (_a2 = s.description) !== null && _a2 !== void 0 ? _a2 : "";
          });
          this.customTransformerRegistry = new custom_transformer_registry_1.CustomTransformerRegistry();
          this.allowedErrorProps = [];
          this.dedupe = dedupe;
        }
        SuperJSON2.prototype.serialize = function(object) {
          var identities = /* @__PURE__ */ new Map();
          var output = plainer_1.walker(object, identities, this, this.dedupe);
          var res = {
            json: output.transformedValue
          };
          if (output.annotations) {
            res.meta = __assign(__assign({}, res.meta), { values: output.annotations });
          }
          var equalityAnnotations = plainer_1.generateReferentialEqualityAnnotations(identities, this.dedupe);
          if (equalityAnnotations) {
            res.meta = __assign(__assign({}, res.meta), { referentialEqualities: equalityAnnotations });
          }
          return res;
        };
        SuperJSON2.prototype.deserialize = function(payload) {
          var json = payload.json, meta = payload.meta;
          var result = copy_anything_1.copy(json);
          if (meta === null || meta === void 0 ? void 0 : meta.values) {
            result = plainer_1.applyValueAnnotations(result, meta.values, this);
          }
          if (meta === null || meta === void 0 ? void 0 : meta.referentialEqualities) {
            result = plainer_1.applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
          }
          return result;
        };
        SuperJSON2.prototype.stringify = function(object) {
          return JSON.stringify(this.serialize(object));
        };
        SuperJSON2.prototype.parse = function(string) {
          return this.deserialize(JSON.parse(string));
        };
        SuperJSON2.prototype.registerClass = function(v, options) {
          this.classRegistry.register(v, options);
        };
        SuperJSON2.prototype.registerSymbol = function(v, identifier) {
          this.symbolRegistry.register(v, identifier);
        };
        SuperJSON2.prototype.registerCustom = function(transformer, name) {
          this.customTransformerRegistry.register(__assign({ name }, transformer));
        };
        SuperJSON2.prototype.allowErrorProps = function() {
          var _a;
          var props = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
          }
          (_a = this.allowedErrorProps).push.apply(_a, __spreadArray([], __read(props)));
        };
        SuperJSON2.defaultInstance = new SuperJSON2();
        SuperJSON2.serialize = SuperJSON2.defaultInstance.serialize.bind(SuperJSON2.defaultInstance);
        SuperJSON2.deserialize = SuperJSON2.defaultInstance.deserialize.bind(SuperJSON2.defaultInstance);
        SuperJSON2.stringify = SuperJSON2.defaultInstance.stringify.bind(SuperJSON2.defaultInstance);
        SuperJSON2.parse = SuperJSON2.defaultInstance.parse.bind(SuperJSON2.defaultInstance);
        SuperJSON2.registerClass = SuperJSON2.defaultInstance.registerClass.bind(SuperJSON2.defaultInstance);
        SuperJSON2.registerSymbol = SuperJSON2.defaultInstance.registerSymbol.bind(SuperJSON2.defaultInstance);
        SuperJSON2.registerCustom = SuperJSON2.defaultInstance.registerCustom.bind(SuperJSON2.defaultInstance);
        SuperJSON2.allowErrorProps = SuperJSON2.defaultInstance.allowErrorProps.bind(SuperJSON2.defaultInstance);
        return SuperJSON2;
      })()
    );
    exports.SuperJSON = SuperJSON;
    exports["default"] = SuperJSON;
    exports.serialize = SuperJSON.serialize;
    exports.deserialize = SuperJSON.deserialize;
    exports.stringify = SuperJSON.stringify;
    exports.parse = SuperJSON.parse;
    exports.registerClass = SuperJSON.registerClass;
    exports.registerCustom = SuperJSON.registerCustom;
    exports.registerSymbol = SuperJSON.registerSymbol;
    exports.allowErrorProps = SuperJSON.allowErrorProps;
  }
});

// api/index.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefone: varchar("telefone", { length: 30 }).notNull(),
  tipoPlano: mysqlEnum("tipoPlano", ["Individual", "Familiar", "PJ", "MEI"]).notNull(),
  status: mysqlEnum("status", ["Incompleto", "Concluido"]).default("Incompleto").notNull(),
  origem: varchar("origem", { length: 100 }).default("landing_page"),
  webhookSent: int("webhookSent").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Mora Care — integrações
  botconversaWebhookUrl: process.env.BOTCONVERSA_WEBHOOK_URL ?? "",
  googleSheetsWebhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "",
  fbPixelId: process.env.FB_PIXEL_ID ?? "",
  fbCapiToken: process.env.FB_CAPI_TOKEN ?? "",
  siteUrl: process.env.SITE_URL ?? "https://www.moracare.com.br"
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = { openId: user.openId };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = /* @__PURE__ */ new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message2) {
    super(message2);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/base64.js
function encodeBase64(input) {
  if (Uint8Array.prototype.toBase64) {
    return input.toBase64();
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < input.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
}
function decodeBase64(encoded) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(encoded);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/util/base64url.js
function decode(input) {
  if (Uint8Array.fromBase64) {
    return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), {
      alphabet: "base64url"
    });
  }
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
function encode(input) {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  if (Uint8Array.prototype.toBase64) {
    return unencoded.toBase64({ alphabet: "base64url", omitPadding: true });
  }
  return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(message2, options) {
    super(message2, options);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JWTExpired = class extends JOSEError {
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWSInvalid = class extends JOSEError {
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usage) {
  if (usage && !key.usages.includes(usage)) {
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
  }
}
function checkSigCryptoKey(key, alg, usage) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "Ed25519":
    case "EdDSA": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87": {
      if (!isAlgorithm(key.algorithm, alg))
        throw unusable(alg);
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usage);
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
  types = types.filter(Boolean);
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(", ")}, or ${last}.`;
  } else if (types.length === 2) {
    msg += `one of type ${types[0]} or ${types[1]}.`;
  } else {
    msg += `of type ${types[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types) => {
  return message("Key must be ", actual, ...types);
};
function withAlg(alg, actual, ...types) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types);
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/is_key_like.js
function isCryptoKey(key) {
  return key?.[Symbol.toStringTag] === "CryptoKey";
}
function isKeyObject(key) {
  return key?.[Symbol.toStringTag] === "KeyObject";
}
var is_key_like_default = (key) => {
  return isCryptoKey(key) || isKeyObject(key);
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/is_disjoint.js
var is_disjoint_default = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/is_object.js
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
var is_object_default = (input) => {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/check_key_length.js
var check_key_length_default = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/jwk_to_key.js
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "AKP": {
      switch (jwk.alg) {
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
          algorithm = { name: jwk.alg };
          keyUsages = jwk.priv ? ["sign"] : ["verify"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
        case "EdDSA":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
var jwk_to_key_default = async (jwk) => {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const keyData = { ...jwk };
  if (keyData.kty !== "AKP") {
    delete keyData.alg;
  }
  delete keyData.use;
  return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/validate_crit.js
var validate_crit_default = (Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) => {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/validate_algorithms.js
var validate_algorithms_default = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/is_jwk.js
function isJWK(key) {
  return is_object_default(key) && typeof key.kty === "string";
}
function isPrivateJWK(key) {
  return key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
}
function isPublicJWK(key) {
  return key.kty !== "oct" && typeof key.d === "undefined" && typeof key.priv === "undefined";
}
function isSecretJWK(key) {
  return key.kty === "oct" && typeof key.k === "string";
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/normalize_key.js
var cache;
var handleJWK = async (key, jwk, alg, freeze = false) => {
  cache ||= /* @__PURE__ */ new WeakMap();
  let cached = cache.get(key);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
};
var handleKeyObject = (keyObject, alg) => {
  cache ||= /* @__PURE__ */ new WeakMap();
  let cached = cache.get(keyObject);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const isPublic = keyObject.type === "public";
  const extractable = isPublic ? true : false;
  let cryptoKey;
  if (keyObject.asymmetricKeyType === "x25519") {
    switch (alg) {
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW":
        break;
      default:
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
  }
  if (keyObject.asymmetricKeyType === "ed25519") {
    if (alg !== "EdDSA" && alg !== "Ed25519") {
      throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
      isPublic ? "verify" : "sign"
    ]);
  }
  switch (keyObject.asymmetricKeyType) {
    case "ml-dsa-44":
    case "ml-dsa-65":
    case "ml-dsa-87": {
      if (alg !== keyObject.asymmetricKeyType.toUpperCase()) {
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
      }
      cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
        isPublic ? "verify" : "sign"
      ]);
    }
  }
  if (keyObject.asymmetricKeyType === "rsa") {
    let hash;
    switch (alg) {
      case "RSA-OAEP":
        hash = "SHA-1";
        break;
      case "RS256":
      case "PS256":
      case "RSA-OAEP-256":
        hash = "SHA-256";
        break;
      case "RS384":
      case "PS384":
      case "RSA-OAEP-384":
        hash = "SHA-384";
        break;
      case "RS512":
      case "PS512":
      case "RSA-OAEP-512":
        hash = "SHA-512";
        break;
      default:
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    if (alg.startsWith("RSA-OAEP")) {
      return keyObject.toCryptoKey({
        name: "RSA-OAEP",
        hash
      }, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
    }
    cryptoKey = keyObject.toCryptoKey({
      name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
      hash
    }, extractable, [isPublic ? "verify" : "sign"]);
  }
  if (keyObject.asymmetricKeyType === "ec") {
    const nist = /* @__PURE__ */ new Map([
      ["prime256v1", "P-256"],
      ["secp384r1", "P-384"],
      ["secp521r1", "P-521"]
    ]);
    const namedCurve = nist.get(keyObject.asymmetricKeyDetails?.namedCurve);
    if (!namedCurve) {
      throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    if (alg === "ES256" && namedCurve === "P-256") {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDSA",
        namedCurve
      }, extractable, [isPublic ? "verify" : "sign"]);
    }
    if (alg === "ES384" && namedCurve === "P-384") {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDSA",
        namedCurve
      }, extractable, [isPublic ? "verify" : "sign"]);
    }
    if (alg === "ES512" && namedCurve === "P-521") {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDSA",
        namedCurve
      }, extractable, [isPublic ? "verify" : "sign"]);
    }
    if (alg.startsWith("ECDH-ES")) {
      cryptoKey = keyObject.toCryptoKey({
        name: "ECDH",
        namedCurve
      }, extractable, isPublic ? [] : ["deriveBits"]);
    }
  }
  if (!cryptoKey) {
    throw new TypeError("given KeyObject instance cannot be used for this algorithm");
  }
  if (!cached) {
    cache.set(keyObject, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
};
var normalize_key_default = async (key, alg) => {
  if (key instanceof Uint8Array) {
    return key;
  }
  if (isCryptoKey(key)) {
    return key;
  }
  if (isKeyObject(key)) {
    if (key.type === "secret") {
      return key.export();
    }
    if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") {
      try {
        return handleKeyObject(key, alg);
      } catch (err) {
        if (err instanceof TypeError) {
          throw err;
        }
      }
    }
    let jwk = key.export({ format: "jwk" });
    return handleJWK(key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k) {
      return decode(key.k);
    }
    return handleJWK(key, key, alg, true);
  }
  throw new Error("unreachable");
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/check_key_type.js
var tag = (key) => key?.[Symbol.toStringTag];
var jwkMatchesOp = (alg, key, usage) => {
  if (key.use !== void 0) {
    let expected;
    switch (usage) {
      case "sign":
      case "verify":
        expected = "sig";
        break;
      case "encrypt":
      case "decrypt":
        expected = "enc";
        break;
    }
    if (key.use !== expected) {
      throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
    }
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
  }
  if (Array.isArray(key.key_ops)) {
    let expectedKeyOp;
    switch (true) {
      case (usage === "sign" || usage === "verify"):
      case alg === "dir":
      case alg.includes("CBC-HS"):
        expectedKeyOp = usage;
        break;
      case alg.startsWith("PBES2"):
        expectedKeyOp = "deriveBits";
        break;
      case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
        if (!alg.includes("GCM") && alg.endsWith("KW")) {
          expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
        } else {
          expectedKeyOp = usage;
        }
        break;
      case (usage === "encrypt" && alg.startsWith("RSA")):
        expectedKeyOp = "wrapKey";
        break;
      case usage === "decrypt":
        expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
        break;
    }
    if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) {
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
    }
  }
  return true;
};
var symmetricTypeCheck = (alg, key, usage) => {
  if (key instanceof Uint8Array)
    return;
  if (isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
};
var asymmetricTypeCheck = (alg, key, usage) => {
  if (isJWK(key)) {
    switch (usage) {
      case "decrypt":
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a private JWK`);
      case "encrypt":
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a public JWK`);
    }
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (key.type === "public") {
    switch (usage) {
      case "sign":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
      case "decrypt":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
      default:
        break;
    }
  }
  if (key.type === "private") {
    switch (usage) {
      case "verify":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
      case "encrypt":
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
      default:
        break;
    }
  }
};
var check_key_type_default = (alg, key, usage) => {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A(?:128|192|256)(?:GCM)?(?:KW)?$/.test(alg) || /^A(?:128|192|256)CBC-HS(?:256|384|512)$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key, usage);
  } else {
    asymmetricTypeCheck(alg, key, usage);
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/subtle_dsa.js
var subtle_dsa_default = (alg, algorithm) => {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: parseInt(alg.slice(-3), 10) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
    case "EdDSA":
      return { name: "Ed25519" };
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return { name: alg };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/get_sign_verify_key.js
var get_sign_verify_key_default = async (alg, key, usage) => {
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    return crypto.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  checkSigCryptoKey(key, alg, usage);
  return key;
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/verify.js
var verify_default = async (alg, key, signature, data) => {
  const cryptoKey = await get_sign_verify_key_default(alg, key, "verify");
  check_key_length_default(alg, cryptoKey);
  const algorithm = subtle_dsa_default(alg, cryptoKey.algorithm);
  try {
    return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!is_object_default(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !is_object_default(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
  }
  check_key_type_default(alg, key, "verify");
  const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  let signature;
  try {
    signature = decode(jws.signature);
  } catch {
    throw new JWSInvalid("Failed to base64url decode the signature");
  }
  const k = await normalize_key_default(key, alg);
  const verified = await verify_default(alg, k, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    try {
      payload = decode(jws.payload);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the payload");
    }
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key: k };
  }
  return result;
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/epoch.js
var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs_default = (str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/jwt_claims_set.js
function validateInput(label, input) {
  if (!Number.isFinite(input)) {
    throw new TypeError(`Invalid ${label} input`);
  }
  return input;
}
var normalizeTyp = (value) => {
  if (value.includes("/")) {
    return value.toLowerCase();
  }
  return `application/${value.toLowerCase()}`;
};
var checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!is_object_default(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
}
var JWTClaimsBuilder = class {
  #payload;
  constructor(payload) {
    if (!is_object_default(payload)) {
      throw new TypeError("JWT Claims Set MUST be an object");
    }
    this.#payload = structuredClone(payload);
  }
  data() {
    return encoder.encode(JSON.stringify(this.#payload));
  }
  get iss() {
    return this.#payload.iss;
  }
  set iss(value) {
    this.#payload.iss = value;
  }
  get sub() {
    return this.#payload.sub;
  }
  set sub(value) {
    this.#payload.sub = value;
  }
  get aud() {
    return this.#payload.aud;
  }
  set aud(value) {
    this.#payload.aud = value;
  }
  set jti(value) {
    this.#payload.jti = value;
  }
  set nbf(value) {
    if (typeof value === "number") {
      this.#payload.nbf = validateInput("setNotBefore", value);
    } else if (value instanceof Date) {
      this.#payload.nbf = validateInput("setNotBefore", epoch_default(value));
    } else {
      this.#payload.nbf = epoch_default(/* @__PURE__ */ new Date()) + secs_default(value);
    }
  }
  set exp(value) {
    if (typeof value === "number") {
      this.#payload.exp = validateInput("setExpirationTime", value);
    } else if (value instanceof Date) {
      this.#payload.exp = validateInput("setExpirationTime", epoch_default(value));
    } else {
      this.#payload.exp = epoch_default(/* @__PURE__ */ new Date()) + secs_default(value);
    }
  }
  set iat(value) {
    if (typeof value === "undefined") {
      this.#payload.iat = epoch_default(/* @__PURE__ */ new Date());
    } else if (value instanceof Date) {
      this.#payload.iat = validateInput("setIssuedAt", epoch_default(value));
    } else if (typeof value === "string") {
      this.#payload.iat = validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(value));
    } else {
      this.#payload.iat = validateInput("setIssuedAt", value);
    }
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const verified = await compactVerify(jwt, key, options);
  if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = validateClaimsSet(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/lib/sign.js
var sign_default = async (alg, key, data) => {
  const cryptoKey = await get_sign_verify_key_default(alg, key, "sign");
  check_key_length_default(alg, cryptoKey);
  const signature = await crypto.subtle.sign(subtle_dsa_default(alg, cryptoKey.algorithm), cryptoKey, data);
  return new Uint8Array(signature);
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/jws/flattened/sign.js
var FlattenedSign = class {
  #payload;
  #protectedHeader;
  #unprotectedHeader;
  constructor(payload) {
    if (!(payload instanceof Uint8Array)) {
      throw new TypeError("payload must be an instance of Uint8Array");
    }
    this.#payload = payload;
  }
  setProtectedHeader(protectedHeader) {
    if (this.#protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this.#protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this.#unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this.#unprotectedHeader = unprotectedHeader;
    return this;
  }
  async sign(key, options) {
    if (!this.#protectedHeader && !this.#unprotectedHeader) {
      throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    }
    if (!is_disjoint_default(this.#protectedHeader, this.#unprotectedHeader)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...this.#protectedHeader,
      ...this.#unprotectedHeader
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this.#protectedHeader, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = this.#protectedHeader.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    check_key_type_default(alg, key, "sign");
    let payload = this.#payload;
    if (b64) {
      payload = encoder.encode(encode(payload));
    }
    let protectedHeader;
    if (this.#protectedHeader) {
      protectedHeader = encoder.encode(encode(JSON.stringify(this.#protectedHeader)));
    } else {
      protectedHeader = encoder.encode("");
    }
    const data = concat(protectedHeader, encoder.encode("."), payload);
    const k = await normalize_key_default(key, alg);
    const signature = await sign_default(alg, k, data);
    const jws = {
      signature: encode(signature),
      payload: ""
    };
    if (b64) {
      jws.payload = decoder.decode(payload);
    }
    if (this.#unprotectedHeader) {
      jws.header = this.#unprotectedHeader;
    }
    if (this.#protectedHeader) {
      jws.protected = decoder.decode(protectedHeader);
    }
    return jws;
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/jws/compact/sign.js
var CompactSign = class {
  #flattened;
  constructor(payload) {
    this.#flattened = new FlattenedSign(payload);
  }
  setProtectedHeader(protectedHeader) {
    this.#flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  async sign(key, options) {
    const jws = await this.#flattened.sign(key, options);
    if (jws.payload === void 0) {
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    }
    return `${jws.protected}.${jws.payload}.${jws.signature}`;
  }
};

// node_modules/.pnpm/jose@6.1.0/node_modules/jose/dist/webapi/jwt/sign.js
var SignJWT = class {
  #protectedHeader;
  #jwt;
  constructor(payload = {}) {
    this.#jwt = new JWTClaimsBuilder(payload);
  }
  setIssuer(issuer) {
    this.#jwt.iss = issuer;
    return this;
  }
  setSubject(subject) {
    this.#jwt.sub = subject;
    return this;
  }
  setAudience(audience) {
    this.#jwt.aud = audience;
    return this;
  }
  setJti(jwtId) {
    this.#jwt.jti = jwtId;
    return this;
  }
  setNotBefore(input) {
    this.#jwt.nbf = input;
    return this;
  }
  setExpirationTime(input) {
    this.#jwt.exp = input;
    return this;
  }
  setIssuedAt(input) {
    this.#jwt.iat = input;
    return this;
  }
  setProtectedHeader(protectedHeader) {
    this.#protectedHeader = protectedHeader;
    return this;
  }
  async sign(key, options) {
    const sig = new CompactSign(this.#jwt.data());
    sig.setProtectedHeader(this.#protectedHeader);
    if (Array.isArray(this.#protectedHeader?.crit) && this.#protectedHeader.crit.includes("b64") && this.#protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    return sig.sign(key, options);
  }
};

// server/_core/sdk.ts
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
function registerStorageProxy(app2) {
  app2.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
var import_superjson = __toESM(require_dist(), 1);
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
var t = initTRPC.context().create({
  transformer: import_superjson.default
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers/leads.ts
import { z as z2 } from "zod";

// server/webhookService.ts
function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise(
      (_, reject) => setTimeout(() => reject(new Error(`[${label}] Timeout ap\xF3s ${ms}ms`)), ms)
    )
  ]);
}
async function postWebhook(url, payload, label) {
  const startMs = Date.now();
  console.log(`[${label}] \u25B6 Iniciando disparo \u2014 URL: ${url.substring(0, 80)}...`);
  console.log(`[${label}] Payload: ${JSON.stringify(payload)}`);
  try {
    const fetchPromise = fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const res = await withTimeout(fetchPromise, 12e3, label);
    const elapsed = Date.now() - startMs;
    if (res.ok) {
      const body = await res.text().catch(() => "(sem body)");
      console.log(`[${label}] \u2705 Sucesso \u2014 HTTP ${res.status} \u2014 ${elapsed}ms \u2014 Body: ${body.substring(0, 200)}`);
      return true;
    } else {
      const body = await res.text().catch(() => "(sem body)");
      console.warn(`[${label}] \u26A0\uFE0F HTTP ${res.status} ${res.statusText} \u2014 ${elapsed}ms \u2014 Body: ${body.substring(0, 200)}`);
      return false;
    }
  } catch (err) {
    const elapsed = Date.now() - startMs;
    console.error(`[${label}] \u274C Falha no disparo ap\xF3s ${elapsed}ms:`, err instanceof Error ? err.message : String(err));
    return false;
  }
}
async function sendToSheets(payload) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[Sheets] \u26A0\uFE0F GOOGLE_SHEETS_WEBHOOK_URL n\xE3o configurado \u2014 pulando.");
    return false;
  }
  console.log(`[Sheets] URL configurada: ${url.substring(0, 60)}...`);
  return postWebhook(url, payload, "Sheets");
}
async function sendToBotConversa(payload) {
  const url = process.env.BOTCONVERSA_WEBHOOK_URL;
  if (!url) {
    console.warn("[BotConversa] \u26A0\uFE0F BOTCONVERSA_WEBHOOK_URL n\xE3o configurado \u2014 pulando.");
    return false;
  }
  console.log(`[BotConversa] URL configurada: ${url.substring(0, 60)}...`);
  const flatPayload = {
    sessionId: payload.sessionId,
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    tipoPlano: payload.tipoPlano,
    status: payload.status,
    origem: payload.origem,
    timestamp: payload.timestamp,
    fonte: payload.fonte
  };
  return postWebhook(url, flatPayload, "BotConversa");
}
async function sendLeadToAll(payload) {
  const startMs = Date.now();
  console.log(`[sendLeadToAll] \u25B6 Iniciando disparos \u2014 sessionId: ${payload.sessionId} | status: ${payload.status}`);
  const [sheetsResult, botconversaResult] = await Promise.allSettled([
    sendToSheets(payload),
    sendToBotConversa(payload)
  ]);
  const sheets = sheetsResult.status === "fulfilled" && sheetsResult.value === true;
  const botconversa = botconversaResult.status === "fulfilled" && botconversaResult.value === true;
  const elapsed = Date.now() - startMs;
  console.log(`[sendLeadToAll] \u25C0 Conclu\xEDdo em ${elapsed}ms \u2014 Sheets: ${sheets ? "\u2705" : "\u274C"} | BotConversa: ${botconversa ? "\u2705" : "\u274C"}`);
  if (sheetsResult.status === "rejected") {
    console.error("[sendLeadToAll] Sheets rejeitou:", sheetsResult.reason);
  }
  if (botconversaResult.status === "rejected") {
    console.error("[sendLeadToAll] BotConversa rejeitou:", botconversaResult.reason);
  }
  return { sheets, botconversa };
}

// server/routers/leads.ts
var tipoPlanoEnum = z2.enum(["Individual", "Familiar", "PJ", "MEI"]);
var leadBaseSchema = z2.object({
  sessionId: z2.string().min(1),
  nome: z2.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z2.string().email("E-mail inv\xE1lido"),
  telefone: z2.string().min(8, "Telefone inv\xE1lido"),
  tipoPlano: tipoPlanoEnum,
  origem: z2.string().optional().default("landing_page")
});
function nowBR() {
  return (/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}
var leadsRouter = router({
  /**
   * PASSO 1 — TIRO IMEDIATO (SEM WEBHOOK)
   * Disparado ao clicar no botão CTA.
   * NÃO envia para Sheets nem BotConversa — evita duplicidade.
   * Os webhooks são disparados SOMENTE em complete (Passo 2).
   */
  submitInitial: publicProcedure.input(leadBaseSchema).mutation(async ({ input }) => {
    console.log(`[leads.submitInitial] \u25B6 sessionId=${input.sessionId} nome=${input.nome} \u2014 sem webhook (evitar duplicidade)`);
    try {
      await notifyOwner({
        title: "\u{1F514} Novo lead iniciado \u2014 Mora Care",
        content: `**Nome:** ${input.nome}
**Telefone:** ${input.telefone}
**E-mail:** ${input.email}
**Tipo de Plano:** ${input.tipoPlano}
**Status:** Iniciando preenchimento
**Data:** ${nowBR()}

_Aguardando confirma\xE7\xE3o em /complete..._`
      });
    } catch (notifyErr) {
      console.warn("[leads.submitInitial] Notifica\xE7\xE3o ao owner falhou:", notifyErr instanceof Error ? notifyErr.message : String(notifyErr));
    }
    return { success: true };
  }),
  /**
   * PASSO 2 — CONCLUSÃO (stateless)
   * Disparado quando o usuário finaliza o preenchimento.
   * Recebe todos os dados do lead diretamente do cliente (sem cache em memória),
   * garantindo compatibilidade com ambientes serverless como a Vercel.
   */
  complete: publicProcedure.input(leadBaseSchema).mutation(async ({ input }) => {
    console.log(`[leads.complete] \u25B6 sessionId=${input.sessionId} nome=${input.nome}`);
    const payload = {
      sessionId: input.sessionId,
      nome: input.nome,
      email: input.email,
      telefone: input.telefone,
      tipoPlano: input.tipoPlano,
      status: "Lead Concluiu",
      origem: input.origem,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      fonte: "Mora Care Landing Page"
    };
    let results = { sheets: false, botconversa: false };
    try {
      results = await sendLeadToAll(payload);
      console.log(`[leads.complete] \u2705 Webhooks conclu\xEDdos \u2014 Sheets: ${results.sheets} | BotConversa: ${results.botconversa}`);
    } catch (webhookErr) {
      console.error("[leads.complete] \u274C Erro nos webhooks:", webhookErr instanceof Error ? webhookErr.message : String(webhookErr));
    }
    try {
      await notifyOwner({
        title: "\u2705 Lead CONCLU\xCDDO \u2014 Mora Care",
        content: `**Nome:** ${input.nome}
**Telefone:** ${input.telefone}
**E-mail:** ${input.email}
**Tipo de Plano:** ${input.tipoPlano}
**Status:** Lead Concluiu
**Data:** ${nowBR()}

_Sheets: ${results.sheets ? "\u2705" : "\u274C"} | BotConversa: ${results.botconversa ? "\u2705" : "\u274C"}_`
      });
    } catch (notifyErr) {
      console.warn("[leads.complete] Notifica\xE7\xE3o ao owner falhou:", notifyErr instanceof Error ? notifyErr.message : String(notifyErr));
    }
    return { success: true, dispatched: results };
  })
});

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  leads: leadsRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  })
  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// api/index.ts
console.log("[Vercel] Serverless function initializing...");
console.log("[Vercel] NODE_ENV:", process.env.NODE_ENV);
console.log("[Vercel] BOTCONVERSA_WEBHOOK_URL configured:", !!process.env.BOTCONVERSA_WEBHOOK_URL);
console.log("[Vercel] GOOGLE_SHEETS_WEBHOOK_URL configured:", !!process.env.GOOGLE_SHEETS_WEBHOOK_URL);
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
registerStorageProxy(app);
registerOAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
    onError({ error, path }) {
      console.error(`[tRPC] Error on ${path}:`, error.message, error.cause ?? "");
    }
  })
);
app.use((err, _req, res, _next) => {
  console.error("[Express] Unhandled error:", err.message, err.stack);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
});
var index_default = app;
export {
  index_default as default
};
