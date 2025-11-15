<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";
    import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import ObsidianIcon from "./ObsidianIcon.svelte";
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
//https://svelte.dev/tutorial/kit/the-form-element
    interface Props{
        subFiles: FileArrangement[],
		dragDisabled:boolean,
		currentSelection: FolderArrangement|FileArrangement;
		handleConfigureChoice: (e:Event) => void;
		handleFinalise:(e:Event) => void;
		startDrag: () =>void;
		stopDrag: ()=>void;
		type:string;
		changeSelection:(selection:FolderArrangement|FileArrangement) => void;
    }

    let {
        subFiles,
		dragDisabled,
		currentSelection,
		handleConfigureChoice,
		handleFinalise,
		startDrag,
		stopDrag,
		type,
		changeSelection
    }:Props =$props();

	const flipDurationMs = 200;
	
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
	

.btn{
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	height: 16px;
}
</style>

<section
	use:dndzone={{ items:subFiles, dragDisabled, flipDurationMs,type }}
	onconsider={handleConfigureChoice}
	onfinalize={handleFinalise}
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
			<div><button class="btn" onclick={()=>changeSelection(subfile)}>{removeExtension(subfile.name)}</button></div>
			
			
  	</div>
	{/each}
</section> 