module.exports = class AbstractFactory {
  entitySelector(id) {
    throw new Error('factoryMethod not implemented');
  }

  make(id){
    return new (this.entitySelector(id));
  }
};
