<script>
	import List from '$lib/List/index.svelte';
	import boards from '../store/boards.js';
	import Button from '../lib/shared/Button.svelte';
	import Input from '../lib/shared/Input.svelte';
	import { onDestroy, onMount } from 'svelte';
	import movingCard from '../store/movingCard.js';

	let newListTitle = '';
	let placeholder;
	let unsubscribeBoards = () => {};
	let listCoordinates;
	let mounted = false;
	$: if (mounted) {
		if ($movingCard.isDragging) {
			document.addEventListener('mousemove', hoverCard);
			document.addEventListener('mouseup', moveCardToTarget);
			placeholder.style.display = 'inline-block';
		} else {
			document.removeEventListener('mousemove', hoverCard);
			document.removeEventListener('mouseup', moveCardToTarget);
			placeholder.style.display = 'none';
			$movingCard.ele?.remove();
		}
	}

	const handleNewListTitleChange = (e) => {
		newListTitle = e.target.value;
	};

	const fetchData = async () => {
		const response = await fetch('/api/board.json');
		const res = await response.json();
		boards.set(res);
	};

	$: console.log($boards);

	const addList = async () => {
		await fetch('/api/board.json', {
			method: 'POST',
			body: JSON.stringify({ title: newListTitle, cards: [] })
		});
		await fetchData();
		newListTitle = '';
	};

	const getListCoordinates = () => {
		const listElements = typeof window !== 'undefined' ? document.getElementsByName('list') : [];
		const output = [];
		listElements.forEach((listElement) => {
			const { x, width } = listElement.getBoundingClientRect();
			output.push({ min: x, max: x + width, ele: listElement });
		});
		return output;
	};

	const moveCardToTarget = () => {
		console.log($movingCard);
		if ($movingCard.targetCardIndex >= 0 && $movingCard.targetCardIndex >= 0) {
			boards.moveCard(
				$movingCard.cardIndex,
				$movingCard.listIndex,
				$movingCard.targetCardIndex,
				$movingCard.targetListIndex
			);
		}
		movingCard.update({ isDragging: false });
	};

	const hoverCard = (e) => {
		const { clientX, clientY } = e;
		$movingCard.ele.style.top = `${clientY - $movingCard.offsetY}px`;
		$movingCard.ele.style.left = `${clientX - $movingCard.offsetX}px`;

		const listIndex = listCoordinates.findIndex((list) => list.min < clientX && list.max > clientX);
		if (listIndex < 0) {
			return;
		}
		const listEle = listCoordinates[listIndex].ele;
		const cards = listEle.querySelectorAll('.card');
		let elementAfter = null;
		let cardIndex = cards.length;
		let count = 0;
		[...cards].reduce((accum, card) => {
			const { y, height } = card.getBoundingClientRect();
			const offset = clientY - (y + height / 2);
			if (offset < 0 && accum < offset) {
				elementAfter = card;
				cardIndex = count;
				count = count + 1;
				return offset;
			}
			count = count + 1;
			return accum;
		}, Number.NEGATIVE_INFINITY);
		placeholder.style.display = 'inline-block';
		placeholder.style.height = $movingCard.height + 'px' || '100px';
		placeholder.style.width = $movingCard.width + 'px' || '250px';
		if (elementAfter) {
			listEle.firstChild.insertBefore(placeholder, elementAfter);
			movingCard.update({ targetListIndex: listIndex, targetCardIndex: cardIndex });
		} else {
			listCoordinates[listIndex].ele.firstChild.appendChild(placeholder);
			movingCard.update({ targetListIndex: listIndex, targetCardIndex: cardIndex });
		}
		// console.log('List: ', listIndex, 'Card: ', cardIndex, 'elementAfter: ', elementAfter);
	};

	onMount(() => {
		fetchData();
		document.addEventListener('mousemove', hoverCard);
		document.addEventListener('mouseup', moveCardToTarget);
		placeholder = document.createElement('div');
		placeholder.setAttribute('id', 'placeholder-card');
		placeholder.style.background = 'rgba(0,0,0,0.3)';
		placeholder.style.borderRadius = '0.5rem';
		unsubscribeBoards = boards.subscribe(() => {
			listCoordinates = getListCoordinates();
		});
		mounted = true;
	});

	onDestroy(() => {
		unsubscribeBoards();
	});

</script>

<div class="page-container">
	<div class="page-wrapper">
		<h1>Trello Board</h1>
		<div class="board-canvas scrollbar">
			<div class="board-flex-wrapper">
				<div class="board-wrapper">
					{#each $boards as list, i (list.title + i)}
						<List title={list.title} cards={list.cards} listIndex={i} />
					{/each}
					<form on:submit|preventDefault={addList}>
						<Input
							placeholder="Enter board title"
							value={newListTitle}
							on:keyup={handleNewListTitleChange}
						/>
						<Button type="submit" className="primary mt-3" disabled={newListTitle.length === 0}
							>Add List</Button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<style type="text/scss">
	.page-container {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: 100%;
		overflow: hidden;
	}

	.page-wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
	}

	.board-canvas {
		position: relative;
		flex-grow: 1;
		overflow: hidden;
	}

	.board-flex-wrapper {
		position: relative;
		height: 100%;
	}

	.board-wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-y: auto;
		overflow-x: scroll;
		display: flex;
	}

</style>
