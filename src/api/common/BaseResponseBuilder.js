/* eslint-disable no-unused-vars, class-methods-use-this */
const DefaultTransformer = require('./DefaultTransformer');

module.exports = class AbstractResponseBuilder {
  static build(args = {}) {
    return this.processData(args).then((data) => {
      const defaultTransformer = args.transformer || this.transformer();
      if (!args.skipTransform && defaultTransformer && typeof (defaultTransformer.transform) !== 'undefined') {
        data = defaultTransformer.transform(data);
      }
      return data;
    });
  }

  static async processData(transformer = null) {
    throw new Error('not implemented yet');
  }

  static transformer() {
    return DefaultTransformer;
  }
};
