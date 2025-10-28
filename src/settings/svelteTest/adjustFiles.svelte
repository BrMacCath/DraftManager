<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";
    import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
    import type {DndEvent} from "svelte-dnd-action";
	import ObsidianIcon from "./ObsidianIcon.svelte";
//https://svelte.dev/tutorial/kit/the-form-element
    interface Props{
        subFiles: FileArrangement[]
    }

    let {
        subFiles=$bindable()
    }:Props =$props();

	const flipDurationMs = 200;
	let dragDisabled = $state(true);
	
	function handleConsider(e:CustomEvent<DndEvent>){
		subFiles = e.detail.items;
	};
	function handleFinalize(e){
		subFiles = e.detail.items;
    }

	const startDrag = () => {
		dragDisabled = false;
	};
	const stopDrag = () => {
		dragDisabled = true;
	};
	function removeExtension(str:string){
		const index= str.indexOf(".");
		if(index ===-1){
			return str;
		}
		return str.slice(0,index);
	}
 

</script>
<style>
	.div-animate {
		position: relative;
		height: 1.5em;
		width: 10em;
		text-align: center;
		margin: 0.2em;
		padding: 0.3em;
	}
	.handle {
		cursor: grab;
		position: absolute;
		display: flex;
	}
	.alignIconInDivInMiddle {
    display: flex;
    align-items: center;
}
.textAlign{
	text-align: left;
	left: 0;
}
</style>

<section
	use:dndzone={{ items:subFiles, dragDisabled, flipDurationMs }}
	onconsider={handleConsider}
	onfinalize={handleFinalize}
>
	{#each subFiles as subfile(subfile.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="div-animate">
			<div 
			class="handle" 
			tabindex={dragDisabled ? 0 : -1}
			onmousedown={startDrag} 
			ontouchstart={startDrag} 
			onmouseup={stopDrag} 
			ontouchend={stopDrag}
			 role="button"
		
			 > 
				 <ObsidianIcon iconId="file" size={16} />

			</div>
			<div><span class="textAlign">{removeExtension(subfile.file)}</span></div>
			
			
  	</div>
	{/each}
</section> 