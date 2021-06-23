<script>
	import EditableText from '$lib/shared/EditableText.svelte';
	import boards from '../../store/boards';
	import movingCard from '../../store/movingCard';

	export let title = '',
		cardIndex,
		listIndex;

	const handleTitleChange = async (e) => {
		boards.updateCard({ title: e.detail }, cardIndex, listIndex);
	};

	const handleMouseDown = (e) => {
		let ele = e.currentTarget.cloneNode(true);
		const { height, width } = e.currentTarget.getBoundingClientRect();

		ele.setAttribute('id', 'moving-card');
		ele.style.position = 'fixed';
		ele.style.top = `${e.clientY - e.offsetY}px`;
		ele.style.left = `${e.clientX - e.offsetX}px`;
		ele.style.width = width;
		ele.style.transform = 'rotateZ(-5deg)';
		document.body.appendChild(ele);
		e.currentTarget.style.opacity = 0;
		e.currentTarget.style.margin = 0;
		e.currentTarget.style.padding = 0;
		e.currentTarget.style.height = 0;
		movingCard.update({
			offsetX: e.offsetX,
			offsetY: e.offsetY,
			ele,
			isDragging: true,
			width,
			height,
			listIndex,
			cardIndex
		});
		const elem = e.currentTarget;
		document.addEventListener('mouseup', () => {
			console.log(e.currentTarget, elem, 'Mouseup');
			elem.style.opacity = 1;
			elem.style.margin = '1rem 0';
			elem.style.padding = '1rem';
			elem.style.height = 'auto';
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
