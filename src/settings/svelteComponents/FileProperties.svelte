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
    import { draftStyleOptions } from "types/choices/draftStyleOptions";
    import { Setting } from "obsidian";

    //new Setting
</script>


<div>
    <!-- Make this a title -->
    <div>
        Name: {fileData.file}
    </div>
    <!-- Placement: Let this be moved up and down -->
    <div>
        Placement buttons
    </div>
    


</div>