import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const API_URL = "https://hindi-quotes.vercel.app/random";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const year = new Date().getFullYear();

app.get("/", async (req, res) => {
	res.render("index.ejs", { year: year });
});

app.post("/", async (req, res) => {
	try {
		const response = await axios.get(API_URL);
		const quoteType = response.data.type;
		const quote = response.data.quote;
		res.render("index.ejs", {
			type: quoteType.charAt(0).toUpperCase() + quoteType.slice(1),
			quote: quote,
			year: year,
		});
	} catch (error) {
		console.log(error.response.data);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
