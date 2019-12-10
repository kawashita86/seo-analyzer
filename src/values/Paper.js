import Paper from "yoastseo/src/values/Paper";

const defaultAttributes = {
  alt: "",
  value: "",
};

export default class PaperCustom extends Paper {
  constructor(text, attributes) {
    super(text, {
      ...defaultAttributes,
      ...attributes,
    });
  }

  hasAlt() {
    return this._attributes.alt !== "";
  }

  getAlt() {
    return this._attributes.alt;
  }

  hasValue() {
    return this._attributes.value !== "";
  }

  getValue() {
    return this._attributes.value;
  }
}
