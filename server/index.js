const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const authRoutes = require("./routes/authRoutes");
const purchaseRoutes = require('./routes/purchaseRoutes');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cars", carRoutes);
app.use('/api/users', authRoutes);
app.use('/api/payment', purchaseRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
  );
});
