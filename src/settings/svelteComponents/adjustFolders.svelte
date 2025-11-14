<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";
    import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import ObsidianIcon from "./ObsidianIcon.svelte";
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import AdjustFolders from "./adjustFolders.svelte";
//https://svelte.dev/tutorial/kit/the-form-element
    interface Props{
        Folder: FolderArrangement,
		dragDisabled:boolean,
        tabs:number,
        currentSelection: FolderArrangement|FileArrangement;
		startDrag: () =>void;
		stopDrag: ()=>void;
        saveChanges: ()=>void;
        changeSelection:(selection:FolderArrangement|FileArrangement) => void;
		changeFileList:(fileList:FileArrangement[])=>void;
    }

    let {
        Folder=$bindable(),
		dragDisabled,
        tabs,
        currentSelection=$bindable(),
		startDrag,
		stopDrag,
        saveChanges,
        changeSelection,
		changeFileList

    }:Props =$props();

    let subFiles = $state(Folder.subFiles)
    let subFolders = $state(Folder.subFolders)
	const flipDurationMs = 200;
	function handleConfigureChoice(e: any) {
        subFiles = e.detail.items;         
	}

    function handleFinalise(e:any){
		let {items: newItems} = e.detail;
        collapseId = "";
        // Remove internal placeholder item from state to avoid ghost gaps
        const sanitized = (newItems as FileArrangement[]).filter(
            (it) => it.id !== SHADOW_PLACEHOLDER_ITEM_ID
        );
        // Always re-disable dragging when the sort finalizes
        dragDisabled = true;
        Folder.subFiles = subFiles;
        saveChanges()
    }

    function handleConfigureChoiceFolder(e: any) {
        subFolders = e.detail.items;
	}
    //This is going to the wrong place. It is saving it to subfiles
    function handleFinaliseFolder(e:any){
		let {items: newItems} = e.detail;
        collapseId = "";
        // Remove internal placeholder item from state to avoid ghost gaps
        const sanitized = (newItems as FolderArrangement[]).filter(
            (it) => it.id !== SHADOW_PLACEHOLDER_ITEM_ID
        );
        // Always re-disable dragging when the sort finalizes
        dragDisabled = true;
        Folder.subFolders = subFolders;
        saveChanges()  
    }

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
	text-align: left;
	left: 0;
	height: 16px;
}
</style>

 <section
    use:dndzone={{ items:subFolders, dragDisabled, flipDurationMs,dropFromOthersDisabled:true,type:"folder "+ Folder.id }}
	onconsider={handleConfigureChoiceFolder}
	onfinalize={handleFinaliseFolder}
>
{#each subFolders as subFolder,index(subFolder.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
            <div class="div-animate">
			<div 
			class="handle" 
			tabindex={dragDisabled ? 0 : -1}
			onmousedown={startDrag} 
			ontouchstart={startDrag} 
			onmouseup={stopDrag} 
			ontouchend={stopDrag}
			 role="button"
		
			 > 
				 <ObsidianIcon iconId="folder" size={16} />

			</div>
			<div><button class="btn"  onclick={()=>{{
				changeSelection(subFolder)
				changeFileList(Folder.subFiles)
			}}}>{subFolder.folder}</button></div>
			</div>
			<div style="margin-left: {tabs}px">
			<AdjustFolders bind:Folder={subFolders[index]} {dragDisabled} {tabs} {currentSelection}
                {startDrag}
                {stopDrag}
                {saveChanges} 
                {changeSelection}
				{changeFileList}>
            </AdjustFolders>  
            </div>
  	</div>
	{/each}    

</section> 




<section
	use:dndzone={{ items:subFiles, dragDisabled, flipDurationMs,type:"file "+ Folder.id  }}
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
			<div><button class="btn" onclick={()=>changeSelection(subfile)}>{removeExtension(subfile.file)}</button></div>
			
			
  	</div>
	{/each}
</section> 
