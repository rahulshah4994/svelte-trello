<script>
	import { createEventDispatcher } from 'svelte';

	export let type = 'text',
		label = '';

	const dispatch = createEventDispatcher();
	let labelActive = false;
	let active = false;
	const handleFocus = () => {
		active = true;
		labelActive = true;
		dispatch('focus');
	};

	const handleBlur = (e) => {
		if (e.target.value.length === 0) {
			labelActive = false;
		}
		dispatch('blur');
		active = false;
	};

</script>

<div class:active>
	<label class:labelActive class:active>{label}</label>
	<input {type} on:change on:focus={handleFocus} on:blur={handleBlur} />
</div>

<style>
	input {
		border: 0;
		padding: 0.75rem;
		outline: none;
		background: none;
	}

	div {
		position: relative;
		display: inline-block;
		border-bottom: 1px solid black;
	}

	div:hover {
		border-bottom: 2px solid black;
		background-color: var(--tertiary-color);
	}

	div::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--primary-color);
		transform: scaleX(0);
		transition: transform 0.2s ease-out;
	}

	div.active::after {
		transform: scaleX(1);
	}

	label {
		position: absolute;
		z-index: 1;
		top: 0.75rem;
		left: 0.75rem;
		color: var(--placeholder-color);
		transform-origin: left;
		transition: transform 0.2s ease-out;
	}

	label.labelActive {
		transform: scale(0.75) translateY(-1.75rem);
	}

	label.active {
		color: var(--primary-color);
	}

</style>
