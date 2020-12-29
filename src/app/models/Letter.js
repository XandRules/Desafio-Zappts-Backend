import Sequelize, {
  Model
} from 'sequelize';

class Letter extends Model {
  static init(sequelize) {
    // migration de Propriedades
    super.init({
      content: Sequelize.STRING,
      title: Sequelize.STRING,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }
}
export default Letter;
