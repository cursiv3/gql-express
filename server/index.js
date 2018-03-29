var path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  graphqlHTTP = require("express-graphql"),
  bodyParser = require("body-parser"),
  config = require("../config.js"),
  schema = require("../graphql/graphqlAPI").schema,
  root = require("../graphql/graphqlAPI").root,
  Item = require("../server/db/schema");
app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/index.html"));
});

app.post("/addItem", (req, res) => {
  var formData = new Item(req.body);
  formData
    .save()
    .then(item => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(400).send("Unable to save due to error:, ", err);
    });
});

app.listen(4000);
console.log("GraphQL/Express API running at localhost:4000/graphql");
