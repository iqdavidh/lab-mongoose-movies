
const express = require('express');

const app = express();

app.use(express.static('dist'));


app.get("/debug", function (req, res) {
  res.send('Im static');
});

const port = 4002;
app.listen(port, () => console.log(`static server running on port ${port}!`));
