// Imports de Express
const express = require("express");
const app = express();
const { Router } = express;
const router = Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import class para API
const Contenedor = require("./class");
const container = new Contenedor("api");

// Routers
// get
router.get("", async (req, res) => {
	let content = await container.getAll();
	if (!content) {
		return res.json({ error: "producto no encontrado" });
	} else {
		return res.json(content);
	}
});
router.get("/:id", async (req, res) => {
	const id = Number(req.params.id);
	console.log(id);
	let content = await container.getById(id);
	if (!content) {
		return res.json({ error: "No hay productos" });
	} else {
		content.sort((item) => item.id - item.id);
		await container.deleteAll();
		await container.save(content);
		return res.json(content);
	}
});

// post
router.post("", async (req, res) => {
	let content = await container.getAll();
	let id = content.length + 1;
	const newItem = req.body;
	newItem.id = id;
	container.save(newItem);
	return res.json(newItem);
});

// put
router.put("/:id", async (req, res) => {
	let id = Number(req.params.id);
	let oldItem = await container.getById(id);
	if (!oldItem) {
		return res.json({ error: "producto no encontrado" });
	} else {
		await container.deleteById(id);

		oldItem.title = req.body.title;
		oldItem.price = req.body.price;
		oldItem.thumbnail = req.body.thumbnail;
		oldItem.id = id;
		container.save(oldItem);
		return res.json(oldItem);
	}
});

// delete
router.delete("/:id", async (req, res) => {
	let id = Number(req.params.id);
	let item = container.getById(id);
	if (item) {
		await container.deleteById(id);
		return res.json(`Se ha eliminado el item con el id ${item.id}`);
	} else {
		return res.json({ error: "No se encontro un producto con ese id" });
	}
});
router.delete("/delete/all", (req, res) => {
	container.deleteAll();
	return res.json("Se han eliminado todos los productos");
});
//APP.use de router
app.use("/api/productos", router);

// Puerto
const PORT = 8080;
app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
app.on("error", (error) => {
	console.log(error);
});
app.use(express.static(__dirname + "/public"));
