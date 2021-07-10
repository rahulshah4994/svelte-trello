<script>
	import Button from '$lib/shared/Button.svelte';
	import EditableText from '$lib/shared/EditableText.svelte';
	import Input from '$lib/shared/Input.svelte';
	import boards from '../../store/boards';
	import Card from '$lib/Card/index.svelte';
	import { slide } from 'svelte/transition';

	export let title = '',
		id = '',
		listIndex,
		cards = [];

	let newCardTitle = '';
	const handleNewCardTitleChange = (e) => (newCardTitle = e.target.value);

	const handleNewCardCreation = async () => {
		boards.addCard({ title: newCardTitle }, listIndex);
		newCardTitle = '';
	};

	const handleTitleChange = async (e) => {
		newListTitle = '';
		boards.updateList({ title: e.detail }, listIndex);
	};

</script>

<div in:slide={{ delay: 50, duration: 500 }} class="list-container mx-2" name="list">
	<div class="scrollbar list ">
		<h4><EditableText text={title} on:submit={handleTitleChange} /></h4>
		{#each cards as card, i (card.title)}
			<Card title={card.title} cardIndex={i} {listIndex} />
		{/each}
	</div>
	<div>
		<form on:submit|preventDefault={handleNewCardCreation}>
			<div class="new-card spaced-row">
				<Input
					on:keyup={handleNewCardTitleChange}
					value={newCardTitle}
					placeholder="Enter card title"
				/>
				<Button type="submit" className="sm primary p-1">Add</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.list-container {
		display: flex;
		flex-direction: column;
		height: auto;
		flex-shrink: 1;
		margin-bottom: 12px;
		width: 275px;
		min-width: 275px;
		padding: 0.75rem 0.5rem;
		background-color: #ebecf0;
		border-radius: 0.5rem;
	}

	.list {
		overflow-y: scroll;
	}

</style>
