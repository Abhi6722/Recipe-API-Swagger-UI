const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const RecipeRouter = require('./routes/Recipe');
require('dotenv').config();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Recipe API",
			version: "1.0.0",
			description: "A simple Express Recipe API",
		},
		servers: [
			{
				url: process.env.SERVER_URL,
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api", RecipeRouter);

// MongoDB configuration
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});