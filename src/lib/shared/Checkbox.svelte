<script>
	export let checked, defaultChecked, label;

</script>

<label>
	<input type="checkbox" {checked} {defaultChecked} on:change />
	<span class="checkmark" />
	<span class="label">{label}</span>
</label>

<style type="text/scss">
	input {
		display: none;
	}

	label {
		cursor: pointer;
		display: inline-block;
		line-height: 1rem;
		vertical-align: middle;
	}

	.label {
		vertical-align: middle;
	}

	.checkmark {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border: 2px solid var(--secondary-color);
		position: relative;
		vertical-align: middle;
		margin: 0.25rem;

		&::after {
			content: '';
			position: absolute;
			top: 0.375rem;
			left: 0.25rem;
			width: 0.5rem;
			height: 0.25rem;
			border-left: 2px solid white;
			border-bottom: 2px solid white;
			transform: rotateZ(-45deg);
			transform-origin: 0.125rem 0.25rem;
		}
	}

	input:checked ~ .checkmark {
		background-color: var(--primary-color);
		border-color: var(--primary-color);
	}

</style>
