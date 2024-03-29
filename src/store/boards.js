import { writable } from 'svelte/store';

const boardsStore = writable([
	{ title: 'Sample List 1', cards: [{ title: 'Sample Card 1' }, { title: 'Sample Card 2' }] },
	{ title: 'Sample List 2', cards: [{ title: 'Sample Card 3' }, { title: 'Sample Card 4' }] }
]);

const boards = {
	subscribe: boardsStore.subscribe,
	set: boardsStore.set,
	addList: (newList) =>
		boardsStore.update((value) => {
			value.push(newList);
			value = value;
			return value;
		}),
	setList: (newList, listIndex) =>
		boardsStore.update((value) => {
			value[listIndex] = newList;
			return value;
		}),
	updateList: (updatedList, listIndex) =>
		boardsStore.update((value) => {
			value[listIndex] = { ...value[listIndex], ...updatedList };
			return value;
		}),
	deleteList: (listIndex) =>
		boardsStore.update((lists) => {
			lists.splice(listIndex, 1);
			lists = lists;
			return lists;
		}),
	addCard: (card, listIndex) =>
		boardsStore.update((lists) => {
			console.log(lists, listIndex, lists[listIndex]);
			lists[listIndex].cards.push(card);
			lists = lists;
			return lists;
		}),
	setCard: (newCard, cardIndex, listIndex) =>
		boardsStore.update((lists) => {
			lists[listIndex].cards[cardIndex] = newCard;
			return lists;
		}),
	updateCard: (updatedProperties, cardIndex, listIndex) =>
		boardsStore.update((lists) => {
			let card = lists[listIndex].cards[cardIndex];
			card = { ...card, ...updatedProperties };
			return lists;
		}),
	deleteCard: (cardIndex, listIndex) =>
		boardsStore.update((lists) => {
			lists[listIndex].cards.splice(cardIndex, 1);
			lists = lists;
			return lists;
		}),
	moveCard: (oldCardIndex, oldListIndex, newCardIndex, newListIndex) =>
		boardsStore.update((lists) => {
			const card = lists[oldListIndex].cards[oldCardIndex];
			console.log(oldCardIndex, oldListIndex, newCardIndex, newListIndex);
			if (oldListIndex === newListIndex) {
				lists[oldListIndex].cards.splice(oldCardIndex, 1);
				const newIndex = oldCardIndex > newCardIndex ? newCardIndex : newCardIndex - 1;
				lists[oldListIndex].cards.splice(newIndex, 0, card);
				lists = lists;
				return lists;
			}
			lists[oldListIndex].cards.splice(oldCardIndex, 1);
			lists[newListIndex].cards.splice(newCardIndex, 0, card);
			lists = lists;
			return lists;
		})
};

export default boards;
