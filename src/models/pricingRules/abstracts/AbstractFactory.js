module.exports = class AbstractFactory {
  entitySelector(ruleIdentifier, ruleConfiguration) {
    throw new Error('factoryMethod not implemented');
  }

  make(ruleIdentifier, ruleConfiguration){
    return this.entitySelector(ruleIdentifier,ruleConfiguration);
  }
};
