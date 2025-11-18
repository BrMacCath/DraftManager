<script lang="ts">
    interface Props{
        tabs: number;
        folderArrangement: BaseFolderArrangement;
        contentEl: HTMLElement;
    }

    let {
        tabs,
        folderArrangement,
        contentEl
    }:Props =$props();
    
    let dragDisabled = $state(true);
    let subFiles = $state(folderArrangement.folder.subFiles);
    let subFolders = $state(folderArrangement.folder.subFolders);
    let currentSelection:FolderArrangement|FileArrangement = $state(folderArrangement.folder)
    let fileList:FileArrangement[] = $state([])
    let organisingList:FileArrangement[]|FolderArrangement[] = $state([folderArrangement.folder])

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
        // const tempFileList:FileArrangement[] =fileList
        fileList = tempFileList
    }
    function changeOrganisingList(tempOrgList:FileArrangement[]|FolderArrangement[]){
        organisingList = tempOrgList;
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
        let newFold:BaseFolderArrangement[] = [];
        // Pushing folder Arrangement instead of 
        settingsStore.getState().folders.forEach((fold)=>{
            if(fold.id != folderArrangement.id){
                newFold.push(fold)
                return ;
            }
            // sanitized is sometimes going wrong.
            fold.folder.subFiles = sanitized;
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

        let newFold:BaseFolderArrangement[] = [];
        settingsStore.getState().folders.forEach((fold)=>{
            if(fold.id != folderArrangement.id){
                newFold.push(fold)
                return ;
            }
            // sanitized is sometimes going wrong.
            fold.folder.subFolders = sanitized;
            newFold.push(fold);
        })    
        
		settingsStore.setState({folders: newFold});
    }

    function saveChanges(){
        let newFold:BaseFolderArrangement[] = [];
        settingsStore.getState().folders.forEach((fold)=>{
            if(fold.id != folderArrangement.id){
                newFold.push(fold)
                return ;
            }
    
            // sanitized is sometimes going wrong.
            fold.folder.subFolders = subFolders;
            fold.folder.subFiles = subFiles;
            newFold.push(fold);
        })    
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
	import MoveTypeComponent from "./Snippets/MoveTypeComponent.svelte";
	import ExtractTypeComponent from "./Snippets/ExtractTypeComponent.svelte";
	import NameComponent from "./Snippets/NameComponent.svelte";
	import PlacementComponent from "./Snippets/PlacementComponent.svelte";
	import type { BaseFolderArrangement } from "types/FolderTypes/BaseFolderArrangement";
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
        left: 0;
        padding-right: 0;
	}	

.btn{
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: none;
    height: 16px;
    padding-left: 0;
}
.text-inline{
    display: inline-block;
}
</style>

<div>
<h1 >Update <button onclick={()=>{changeSelection(folderArrangement.folder);
changeFileList([]);
changeOrganisingList([])
}}
    class= "btn"
    >{folderArrangement.folder.name}</button></h1>
</div> 
<section
    use:dndzone={{ items:subFolders, dragDisabled, flipDurationMs,dropFromOthersDisabled:true,type }}
	onconsider={handleConfigureChoiceFolder}
	onfinalize={handleFinaliseFolder}
>
{#each subFolders as subFolder,index(subFolder.id)}
		<div animate:flip={{ duration: flipDurationMs }} >
            <div class="div-animate">
                <!-- https://stackoverflow.com/questions/18361951/making-two-divs-line-up-side-by-side-without-gap -->
                <div class="text-inline">
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
                    <div><button class="btn" 
                        onclick={()=>{changeSelection(subFolder)
                            changeFileList(subFiles)
                            changeOrganisingList(subFolders)
                        }}
                        >{subFolder.name}</button></div>
                    </div>
                </div>
                <div style="margin-left:{tabs}px">
                <AdjustFolders bind:Folder={subFolders[index]} {dragDisabled} {tabs} {currentSelection} 
                    {startDrag}
                    {stopDrag}
                    {saveChanges}
                    {changeSelection} 
                    {changeFileList}
                    {changeOrganisingList}
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
     type={"Files" +folderArrangement.id} {changeOrganisingList} ></AdjustFiles>
</div>

<div>

    <NameComponent name={currentSelection.name} ></NameComponent>

    <PlacementComponent {currentSelection} {organisingList} {saveChanges} ></PlacementComponent>

    <MoveTypeComponent bind:moveType={currentSelection.moveType} {saveChanges}></MoveTypeComponent>

    <ExtractTypeComponent bind:extractType={currentSelection.extractType} {saveChanges} ></ExtractTypeComponent>
   
     {#if currentSelection.compileOutput}
        This text appears if this is a folder.
     {/if}

</div>