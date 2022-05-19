const fs = require("fs");

class Contenedor {
	constructor(name) {
		this.name = name;
	}
	async save(item) {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.txt`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}
		const last = cont[cont.length - 1];

		let id = 1;

		if (last) {
			id = last.id + 1;
		}
		!item.id ? (item.id = id) : item.id;

		cont.push(item);

		return fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify(cont));
	}

	async getById(id) {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.txt`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}

		return cont.find((item) => item.id === id);
	}

	async getAll() {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.txt`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}

		return cont;
	}

	async deleteById(id) {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.txt`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}

		let filteredcont = cont.filter((item) => item.id !== id);

		return fs.promises.writeFile(
			`./${this.name}.txt`,
			JSON.stringify(filteredcont)
		);
	}

	async deleteAll() {
		return fs.promises.writeFile(`./${this.name}.txt`, "");
	}
}
module.exports = Contenedor;

/* (async () => {
	const cont1 = new Contenedor("productos");
	const newProduct = {
		nombre: "Peluche avengers",
		precio: 2000,
	}; 

	await cont1.save(newProduct);

	const item = await cont1.getById(1);
	console.log(item);

	const items = await cont1.getAll();
	console.log(items);
})();
 */
