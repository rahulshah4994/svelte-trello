<script>
	import { createEventDispatcher } from 'svelte';

	export let type = 'text',
		value = '',
		placeholder = '',
		rows = 3,
		size = '',
		className = '';
	const dispatch = createEventDispatcher();

</script>

{#if type !== 'textarea'}
	<input
		{type}
		{value}
		{placeholder}
		class:sm={size === 'small'}
		class={'input ' + className}
		on:keyup
		on:blur
		on:focus
	/>
{:else}
	<textarea {value} {placeholder} {rows} class={'input ' + className} on:change on:blur on:focus />
{/if}

<style type="text/scss">
	input,
	textarea {
		background-color: var(--tertiary-color);
		border-radius: 0;
		border: 2px solid var(--tertiary-color);
		outline: none;
		padding: 0.5rem;

		&:focus {
			border-color: var(--primary-color);
		}

		&.sm {
			padding: 0.25rem;
			font-size: 0.75rem;
		}
	}

</style>
