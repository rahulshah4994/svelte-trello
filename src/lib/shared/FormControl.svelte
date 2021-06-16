<script>
	export let success = false,
		error = false,
		label = '',
		caption = '',
		htmlfor = '',
		labelClass = '',
		captionClass = '',
		className = '';

</script>

<div class:success class:error class={'form-control ' + className}>
	<label {htmlfor} class={`mb-1 ${labelClass}`}>{label}</label>
	<slot />
	<div class={`caption mt-1 text-sm ${captionClass}`}>{caption}</div>
</div>

<style type="text/scss">
	label {
		display: block;
	}

	.form-control {
		@each $state in 'success', 'warning', 'error' {
			&.#{$state} {
				$color-set: map-get($color-map, $state);
				$color: map-get($color-set, 'default');
				$bg-color: map-get($color-set, 'light');
				.caption {
					color: $color;
				}
				:global(input) {
					border-color: $color !important;
					background-color: $bg-color !important;
				}
			}
		}
	}

</style>
