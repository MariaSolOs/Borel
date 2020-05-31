const express = require('express'),
      app = express(),
      cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
    res.send({msg: 'Borel is alive!'})}
);

app.listen(PORT, () => {
    console.log(`Borel on port ${PORT}.`);
});