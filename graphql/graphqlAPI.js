const { buildSchema } = require("graphql"),
  schema = buildSchema(`
	type Query {
        getItem: String
	}
`),
  root = {
    getItem: () => {}
  };

module.exports = {
  schema: schema,
  root: root
};
