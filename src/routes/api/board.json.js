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

export async function patch(req) {
	const { listIndex, cardIndex, updatedEntity } = JSON.parse(req.body);
	if (cardIndex >= 0) {
		db[listIndex].cards[cardIndex] = { ...db[listIndex].cards[cardIndex], ...updatedEntity };
	} else if (listIndex) {
		db[listIndex] = { ...db[listIndex], ...updatedEntity };
	} else {
		db = [...updatedEntity];
		console.log(updatedEntity);
	}

	return {
		status: 200,
		body: 'Successfully updated board',
		headers: {}
	};
}
