const express = require("express");
const fileRouter = require("./src/routes/fileRouter");
const cors = require('cors');

const app = express();
const PORT = 4040;

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/files", fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
