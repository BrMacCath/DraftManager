<script lang="ts">
    interface Props{
        fileData: FileArrangement;
        saveChanges: ()=>void;
    }

    let {
        fileData=$bindable(),
        saveChanges
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation

	import type FileArrangement from "types/FolderTypes/fileArrangement";
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import { draftOptions } from "types/choices/draftOptions";
</script>


<div>
    <div>
        Name: {fileData.file}
    </div>
    <div>
        {fileData.draftConditions.haveTopicFrontMatter}
    </div>
    <div>
        {fileData.draftConditions.draftStyle}
    </div>
    <select bind:value={fileData.draftConditions.draftStyle} onchange={saveChanges}>
        {#each draftOptions as style}
            <option value={style}>{style}</option>
        {/each}
    </select>


</div>