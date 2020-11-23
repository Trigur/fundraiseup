import Vue from 'vue';

function isPrimitiveOrFunctionClass(ClassName) {
  switch(ClassName) {
    case Number:
    case String:
    case Boolean:
    case Symbol:
    case Function:
      return true;
    default:
      return false;
  }
}

function toPrimitiveValue(PrimitiveClassName, value) {
  if (PrimitiveClassName === Function) {
    return () => {};
  }

  return PrimitiveClassName(value || '');
}

function isModelClassName(ClassName) {
  if (BaseModel === ClassName) {
    return true;
  }

  if (ClassName && ClassName.__proto__) {
    return isModelClassName(ClassName.__proto__);
  }

  return false;
}

function getDescriptor(obj, key) {
  if (obj.hasOwnProperty(key)) {
    return Object.getOwnPropertyDescriptor(obj, key);
  }

  if (obj.__proto__) {
    return getDescriptor(obj.__proto__, key);
  }

  return false;
}

const preventSetSymbol = Symbol('stop');

class BaseModel {
  constructor(params = {}) {
    this.registerAttributes(params);
  }

  attributes() {
    return {

    };
  }

  registerAttributes(initial) {
    const attributes = this.attributes();

    Object.defineProperty(this, '_attributes', {
      value: {},
      enumerable: false,
      writable: true,
      configurable: false,
    });

    Object.keys(attributes).forEach(key => {
      const Type = attributes[key];

      if (Type) {
        if (isPrimitiveOrFunctionClass(Type)) {
          this.registerAttribute(key, value => toPrimitiveValue(Type, value));
        } else if (isModelClassName(Type))  {
          this.registerAttribute(key, value => {
            return value instanceof Type
              ? value 
              : new Type(value);
          });
        } else if (typeof Type === 'function') {
          this.registerAttribute(key, value => Type(value));
        }
      } else {
        this.registerAttribute(key, value => value);
      }

      this[key] = initial[key];
    });
  }

  get preventSetSymbol() {
    return preventSetSymbol;
  }

  registerAttribute(key, prepareFn) {
    const defaultSet = (value) => {
      Vue.set(this._attributes, key, prepareFn(value));
    };

    const descriptor = getDescriptor(this, key);
    
    Object.defineProperty(this, key, {
      get: descriptor.get 
        ? descriptor.get 
        : () => {
          return this._attributes[key];
        },
      set: descriptor.set
        ? value => {
          const valueFromDescriptor = descriptor.set(value);

          if (preventSetSymbol !== valueFromDescriptor) {
            defaultSet(valueFromDescriptor);
          }
        }
        : defaultSet,
      configurable: true,
      enumerable: true,
    });
  }
}

export default BaseModel;
