<script>
	export let label = '',
		className = '',
		disabled = false,
		type = 'button';

</script>

<button class={className + ' shadow'} {disabled} {type} on:click>
	<slot />
</button>

<style type="text/scss">
	button {
		padding: 0.75rem;
		border: 0;
		outline: none;
		font-weight: bold;
	}

	button.primary {
		background-color: var(--primary-color);
		color: white;
		&:disabled {
			background-color: #f6f6f6;
			color: #afafaf;
		}
	}

	button.secondary {
		border: 1px solid var(--primary-color);
		color: var(--primary-color);
	}

	button.sm {
		padding: 0.5rem;
	}

</style>
