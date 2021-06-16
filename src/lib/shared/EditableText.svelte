<script>
	import { createEventDispatcher } from 'svelte';

	export let text = '';
	let dispatch = createEventDispatcher();
	let isEditing = false;

	const handleSubmit = (e) => {
		isEditing = false;
		dispatch('submit', text);
		e.currentTarget.children[0]?.blur();
	};

</script>

<form on:submit|preventDefault={handleSubmit}>
	<input
		value={text}
		class:isEditing
		on:change={(e) => (text = e.target.value)}
		on:focus={() => (isEditing = true)}
		on:blur={handleSubmit}
	/>
</form>

<style type="text/scss">
	input {
		border: 2px solid transparent;
		border-radius: 0;
		outline: none;
		background: transparent;
		cursor: pointer;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		padding: 0.25rem;
		&.isEditing {
			border: 2px solid $primary;
			background: white;
		}
	}

</style>
