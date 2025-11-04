<script lang="ts">
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
    console.log(fileList)
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
</script>


<div>
    <div>
        Name: {folderData.folder}
    </div>
    <div>
        {folderData.draftConditions.haveTopicFrontMatter}
    </div>
    <div>
        {folderData.draftConditions.draftStyle}
    </div>

    
    <select bind:value={folderData.compileOutPut} onchange={saveChanges}>
        <!-- State not compile value. -->
        <option value="">No compile output option</option>
        {#each fileList as file }
            <option value={file.file}>{file.file}</option>
        {/each}
    </select>


</div>