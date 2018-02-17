/* eslint-disable no-unused-vars, class-methods-use-this */
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

class DefaultTransformer {
  static body(body) {
    return body;
  }

  static statusCode(code = 200) {
    return code;
  }

  static transform(body) {
    const contentBody = this.body(body);
    const statusCode = this.statusCode();

    return {
      statusCode,
      body: contentBody,
    };
  }
}
