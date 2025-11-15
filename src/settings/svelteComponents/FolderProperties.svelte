<script lang="ts">
import { extractTypeChoices } from "types/choices/extractTypeChoices";
import { moveTypeChoices } from "types/choices/moveTypeChoices";
import type FileArrangement from "types/FolderTypes/fileArrangement";
    interface Props{
        folderData: FolderArrangement;
        fileList: FileArrangement[];
        saveChanges: ()=>void;
    }

    let {
        folderData=$bindable(),
        fileList,
        saveChanges
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation
    
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
	import ExtractTypeComponent from "./Snippets/ExtractTypeComponent.svelte";
	import MoveTypeComponent from "./Snippets/MoveTypeComponent.svelte";
</script>


<div>
    <!-- State the folder you are adjusting -->
    <div>
       <h1> Name: {folderData.name} </h1>
    </div>
    <!-- Placement display hoerizontal -->
    Sort out placement logic here.
    <div>
        <!-- Display vertical -->
        <div>
            <div>
                Purpose
            </div>
            <div>
                desciption
            </div>
        </div>
        <!-- Display horizontal -->
        <div>
            Buttons
        </div>
        
    </div>
    <!-- move Type of data -->
    <MoveTypeComponent bind:moveType={folderData.moveType} {saveChanges}></MoveTypeComponent>
    <!-- Make these a svelte component -->
    <ExtractTypeComponent bind:extractType={folderData.extractType} {saveChanges} ></ExtractTypeComponent>

    <!-- Compile output -->
     {#if fileList.length >0}
        <div> Compile Output:
            <select bind:value={folderData.compileOutPut} onchange={saveChanges}>
            <option value="">No compile option</option>
            {#each fileList as file }
                <option value={file.name}>{file.name}</option>
            {/each}
            </select>
        </div>
    {/if}

</div>
