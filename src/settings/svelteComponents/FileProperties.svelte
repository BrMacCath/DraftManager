<script lang="ts">
    interface Props{
        fileData: FileArrangement;
        saveChanges: ()=>void;

    }

    let {
        fileData=$bindable(),
        saveChanges
    }:Props =$props();

	import type FileArrangement from "types/FolderTypes/fileArrangement";

    //new Setting
</script>


<div>
    <!-- Make this a title -->
    <div>
        Name: {fileData.file}
    </div>

    <!-- Handle move type of data -->
    <!-- Select option that goes through the list. -->
    <div>

    </div>


    <!-- Placement: Let this be moved up and down -->
    <div>
        Placement buttons
    </div>
    
    


</div>