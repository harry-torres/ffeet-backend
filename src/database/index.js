import Sequelize from 'sequelize';
// import models from '../app/models/all';
import databaseConfig from '../config/database';
import requireAll from '../utils/requireAll';

const models = requireAll('app/models').asArray();

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .forEach(
        model => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
