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
       <h1> Name: {folderData.folder} </h1>
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
    <div>
        This will handle the move type of data.
    </div>

    <!-- Compile output -->
     {#if fileList.length >0}
        <div>
            <select bind:value={folderData.compileOutPut} onchange={saveChanges}>
            <option value="">No compile option</option>
            {#each fileList as file }
                <option value={file.file}>{file.file}</option>
            {/each}
            </select>
        </div>
    {/if}

</div>