<script lang="ts">
    interface Props{
        folderData: FolderArrangement;
        saveChanges: ()=>void;
    }

    let {
        folderData=$bindable(),
        saveChanges
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation

	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import { draftOptions } from "types/choices/draftOptions";
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
    <textarea bind:value={folderData.compileOutPut} onchange={saveChanges}></textarea>


</div>