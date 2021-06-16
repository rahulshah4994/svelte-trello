import { writable } from 'svelte/store';

const movingCardStore = writable({
	ele: null,
	offsetX: 0,
	offsetY: 0,
	isDragging: false,
	height: 0,
	listIndex: null,
	cardIndex: null
});

const movingCard = {
	subscribe: movingCardStore.subscribe,
	set: movingCardStore.set,
	update: (update) =>
		movingCardStore.update((value) => {
			return { ...value, ...update };
		})
};

export default movingCard;
