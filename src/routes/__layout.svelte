<script>
	import Header from '$lib/Header/index.svelte';
	import '../scss/app.scss';

</script>

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 0 1rem;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		background: linear-gradient(45deg, #373b44, #4286f4);
	}

</style>
