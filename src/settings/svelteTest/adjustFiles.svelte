<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";
    import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
    import type {DndEvent} from "svelte-dnd-action";
	import ObsidianIcon from "./ObsidianIcon.svelte";
//https://svelte.dev/tutorial/kit/the-form-element
    interface Props{
        subFiles: FileArrangement[],
		handleConfigureChoice: (e:Event) => void;
    }

    let {
        subFiles,
		handleConfigureChoice
    }:Props =$props();

	const flipDurationMs = 200;
	let dragDisabled = $state(true);
	
	function handleConsider(e:CustomEvent<DndEvent>){
		// subFiles = e.detail.items;
		console.log(e)
	};
	function handleFinalize(e){
		
		let {items: newItems} = e.detail;
		console.log(e.detail)
        let collapseId = "";

        // Remove internal placeholder item from state to avoid ghost gaps
        const sanitized = (newItems as FileArrangement[]).filter(
            (it) => it.id !== SHADOW_PLACEHOLDER_ITEM_ID
        );
        // subFiles = sanitized;
		
        // Always re-disable dragging when the sort finalizes
        dragDisabled = true;
		
    }

	const startDrag = () => {
		console.log("In here")
		dragDisabled = false;
	};
	const stopDrag = () => {
		console.log("Not here")
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
	
.textAlign{
	text-align: left;
	left: 0;
}
</style>

<section
	use:dndzone={{ items:subFiles, dragDisabled, flipDurationMs }}
	onconsider={handleConsider}
	onfinalize={handleConfigureChoice}
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