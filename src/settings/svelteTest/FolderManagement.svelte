<script lang="ts">
    interface Props{
        tabs: number;
        folderArrangement: FolderArrangement;
    }

    let {
        tabs,
        folderArrangement,
    }:Props =$props();
    let dragDisabled = $state(true);
    let subFiles = $state(folderArrangement.subFiles);
    let subFolders = $state(folderArrangement.subFolders);
    let currentSelection:FolderArrangement|FileArrangement = $state(folderArrangement)
    let fileList:FileArrangement[] = $state([])

    const startDrag = () => {
		dragDisabled = false;
	};
	const stopDrag = () => {
		dragDisabled = true;
	};

    function handleConfigureChoice(e: any) {
        subFiles = e.detail.items;         
	}
    function changeSelection(selection:FolderArrangement|FileArrangement){
        currentSelection = selection
    }
    function changeFileList(tempFileList:FileArrangement[]){
        console.log("changeFile opened")
        // const tempFileList:FileArrangement[] =fileList
        console.log(fileList)
        fileList = tempFileList
        console.log(fileList)
        
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
        let newFold:FolderArrangement[] = [];
        settingsStore.getState().folders.forEach((fold)=>{
            if(fold.id != folderArrangement.id){
                newFold.push(fold)
                return ;
            }
            // sanitized is sometimes going wrong.
            fold.subFiles = sanitized;
            newFold.push(fold);
        })        
		settingsStore.setState({folders: newFold});
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

        let newFold:FolderArrangement[] = [];
        settingsStore.getState().folders.forEach((fold)=>{
            if(fold.id != folderArrangement.id){
                newFold.push(fold)
                return ;
            }
            // sanitized is sometimes going wrong.
            fold.subFolders = sanitized;
            newFold.push(fold);
        })    
        
		settingsStore.setState({folders: newFold});
    }

    function saveChanges(){
        let newFold:FolderArrangement[] = [];
        settingsStore.getState().folders.forEach((fold)=>{
            if(fold.id != folderArrangement.id){
                newFold.push(fold)
                return ;
            }
            // sanitized is sometimes going wrong.
            fold.subFolders = subFolders;
            fold.subFiles = subFiles;
            newFold.push(fold);
        })    
        console.log("Here")
		settingsStore.setState({folders: newFold});
    }

    const flipDurationMs = 200;
   
    
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import AdjustFiles from "./adjustFiles.svelte";
	import ObsidianIcon from "./ObsidianIcon.svelte";

	import { settingsStore } from "types/zustand/store";
	import type FileArrangement from "types/FolderTypes/fileArrangement";
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import AdjustFolders from "./adjustFolders.svelte";
	import FileProperties from "./FileProperties.svelte";
    import FolderProperties from "./FolderProperties.svelte";
    import { Setting } from "obsidian";
    let type = "folder" +folderArrangement.id
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
<div>
<h1 >Update <button onclick={()=>{changeSelection(folderArrangement);
changeFileList([]);
}}
    
    >{folderArrangement.folder}</button></h1>
</div> 
<section
    use:dndzone={{ items:subFolders, dragDisabled, flipDurationMs,dropFromOthersDisabled:true,type }}
	onconsider={handleConfigureChoiceFolder}
	onfinalize={handleFinaliseFolder}
>
{#each subFolders as subFolder,index(subFolder.id)}
		<div animate:flip={{ duration: flipDurationMs }} >
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
			<div><button class="textAlign" 
                onclick={()=>{changeSelection(subFolder)
                    changeFileList(subFiles)
                }}
                >{subFolder.folder}</button></div>
            </div>
            <div style="margin-left:{tabs}px">
			<AdjustFolders bind:Folder={subFolders[index]} {dragDisabled} {tabs} {currentSelection} 
                {startDrag}
                {stopDrag}
                {saveChanges}
                {changeSelection} 
                {changeFileList}
                >
            </AdjustFolders>  
            </div>
			
  	</div>
    

	{/each}    

</section> 


<div style="margin-left:0px">
    <AdjustFiles {subFiles} {dragDisabled} {currentSelection} {handleConfigureChoice} 
    {handleFinalise} {startDrag}
     {stopDrag} {changeSelection}
     type={"Files" +folderArrangement.id} ></AdjustFiles>
</div>


<div>
{#if currentSelection.folder}
{@const folderData:FolderArrangement = currentSelection}
<FolderProperties {folderData} {fileList} {saveChanges}></FolderProperties>


{/if}

{#if currentSelection.file}

{@const fileData:FileArrangement = currentSelection}
<FileProperties {fileData} {saveChanges}></FileProperties>

{/if}
</div>