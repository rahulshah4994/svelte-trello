<script>
	import Checkbox from '$lib/shared/Checkbox.svelte';
	import FormControl from '$lib/shared/FormControl.svelte';

	import Input from '$lib/shared/Input.svelte';

	let title = '';
	let checked = false;
	const handleTitleChange = (e) => {
		title = e.target.value;
	};

	const handleCheck = (e) => {
		checked = e.target.checked;
	};

</script>

<h1>Component Library</h1>
<h2>Form Elements</h2>
<h3>Text Input</h3>
<Input
	value={title}
	placeholder="Placeholder"
	on:keyup={handleTitleChange}
	on:blur={() => console.log('BLUR TEST')}
	className="mb-3 w-100"
/>
<Input
	type="textarea"
	value={title}
	placeholder="Placeholder"
	on:keyup={handleTitleChange}
	on:blur={() => console.log('BLUR TEST')}
	className="mb-5"
/>
<div class="flex">
	<FormControl
		label="Form Control Demo"
		caption="Sample caption or helper text"
		className="mb-3 w-100"
	>
		<Input
			value={title}
			placeholder="Placeholder"
			on:keyup={handleTitleChange}
			on:blur={() => console.log('BLUR TEST')}
		/>
	</FormControl><FormControl
		label="Error Input"
		caption="Please enter a valid string"
		error={true}
		className="mb-3 w-100"
	>
		<Input
			value={title}
			placeholder="Placeholder"
			on:keyup={handleTitleChange}
			on:blur={() => console.log('BLUR TEST')}
		/>
	</FormControl>
	<FormControl
		label="Success Input"
		caption="This is a valid string!"
		success={true}
		className="mb-3 w-100"
	>
		<Input
			value={title}
			placeholder="Placeholder"
			on:change={handleTitleChange}
			on:blur={() => console.log('BLUR TEST')}
		/>
	</FormControl>
</div>
<h3>Checkbox</h3>
<Checkbox label="Sign up for newsletter" {checked} on:change={handleCheck} />

<h3>Radio</h3>

<style>
	.flex {
		display: flex;
	}

</style>
