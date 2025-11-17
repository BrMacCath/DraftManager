<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";

    interface Props{
        currentSelection: FileArrangement|FileArrangement;
        // choiceList: FileArrangement[]|FileArrangement[];
        // saveChanges: ()=> void;
    }

    let {
        currentSelection,
        // choiceList,
        // saveChanges
    }: Props =$props();
</script>

<div>
    <div>
        <div>
            Placement {currentSelection.name}
        </div>
        <div>
            Descriptions
        </div>
    </div>
    <div>
        Buttons
    </div>
    
</div>