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
    
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    

</script>


<div>
    <!-- State the folder you are adjusting -->
    <div>
        Name: {folderData.folder}
    </div>
    <!-- Placement -->
    <div>
        Sort out placement logic here.
    </div>
    <!-- Compile output -->
    <div>
        Compile output Options
    </div>

</div>