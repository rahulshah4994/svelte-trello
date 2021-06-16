const db = [
	{ title: 'Sample List', cards: [{ title: 'Sample Card 1' }, { title: 'Sample Card 2' }] }
];

export async function get() {
	return {
		status: 200,
		body: db,
		headers: {}
	};
}

export async function post(req) {
	db.push(JSON.parse(req.body));
	return {
		status: 200,
		body: req.body,
		headers: {}
	};
}
