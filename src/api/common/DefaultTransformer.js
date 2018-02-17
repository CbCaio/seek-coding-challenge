module.exports = class DefaultTransformer {
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
};
