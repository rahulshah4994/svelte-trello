<script>
	import EditableText from '$lib/shared/EditableText.svelte';
	import boards from '../../store/boards';
	import movingCard from '../../store/movingCard';

	export let title = '',
		cardIndex,
		listIndex;

	const handleTitleChange = (e) => {
		boards.updateCard({ title: e.detail }, cardIndex, listIndex);
	};

	const handleMouseDown = (e) => {
		let ele = e.currentTarget.cloneNode(true);
		ele.setAttribute('id', 'moving-card');
		ele.style.position = 'fixed';
		ele.style.top = `${e.clientY - e.offsetY}px`;
		ele.style.left = `${e.clientX - e.offsetX}px`;
		ele.style.width = e.currentTarget.style.width;
		ele.style.transform = 'rotateZ(-5deg)';
		document.body.appendChild(ele);
		e.currentTarget.style.opacity = 0;
		e.currentTarget.style.height = 0;

		movingCard.update({
			offsetX: e.offsetX,
			offsetY: e.offsetY,
			ele,
			isDragging: true,
			height: ele.style.height,
			listIndex,
			cardIndex
		});
	};

</script>

<div name="card" on:mousedown={handleMouseDown} class="card p-3 my-3">
	<h4><EditableText text={title} on:submit={handleTitleChange} /></h4>
</div>

<style type="text/scss">
	div {
		box-sizing: border-box;
		z-index: 1;
		border-radius: 0.5rem;
		background-color: white;
		width: auto;
		box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.05);
	}

</style>
