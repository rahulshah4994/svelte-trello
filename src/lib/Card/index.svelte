<script>
	import EditableText from '$lib/shared/EditableText.svelte';
	import boards from '../../store/boards';
	import movingCard from '../../store/movingCard';
	import { fly } from 'svelte/transition';

	export let title = '',
		cardIndex,
		listIndex;

	const handleTitleChange = async (e) => {
		boards.updateCard({ title: e.detail }, cardIndex, listIndex);
	};

	const handleMouseDown = (e) => {
		const { currentTarget, offsetX, offsetY, clientX, clientY } = e;
		const startDrag = () => {
			let ele = currentTarget.cloneNode(true);
			const { height, width } = currentTarget.getBoundingClientRect();

			ele.setAttribute('id', 'moving-card');
			ele.style.position = 'fixed';
			ele.style.top = `${clientY - offsetY}px`;
			ele.style.left = `${clientX - offsetX}px`;
			ele.style.width = width;
			ele.style.transform = 'rotateZ(-5deg)';
			document.body.appendChild(ele);
			currentTarget.style.opacity = 0;
			currentTarget.style.margin = 0;
			currentTarget.style.padding = 0;
			currentTarget.style.height = 0;
			movingCard.update({
				offsetX: offsetX,
				offsetY: offsetY,
				ele,
				isDragging: true,
				width,
				height,
				listIndex,
				cardIndex
			});
			const elem = currentTarget;
			document.addEventListener('mouseup', () => {
				elem.style.opacity = 1;
				elem.style.margin = '1rem 0';
				elem.style.padding = '1rem';
				elem.style.height = 'auto';
			});
		};

		const cancelDragStart = () => clearTimeout(dragStartDelay);

		document.addEventListener('mouseup', cancelDragStart);
		//This drag will be triggered if the mouse is held for at least 200ms
		//This will help distinguish between a click and a drag
		const dragStartDelay = setTimeout(() => {
			startDrag();
			document.removeEventListener('mouseup', cancelDragStart);
		}, 100);
	};

</script>

<div in:fly={{ x: 400 }} name="card" on:mousedown={handleMouseDown} class="card p-3 my-3">
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
