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
	import MoveTypeComponent from "./Snippets/MoveTypeComponent.svelte";
	import ExtractTypeComponent from "./Snippets/ExtractTypeComponent.svelte";
	import PlacementComponent from "./Snippets/PlacementComponent.svelte";

    //new Setting
</script>


<div>
    <!-- Make this a title -->
    <div>
        Name: {fileData.name}
    </div>

    <!-- Handle move type of data -->
    <!-- Select option that goes through the list. -->
    <!-- move Type of data -->
    <MoveTypeComponent bind:moveType={fileData.moveType} {saveChanges}></MoveTypeComponent>
    <!-- Make these a svelte component -->
    <ExtractTypeComponent bind:extractType={fileData.extractType} {saveChanges} ></ExtractTypeComponent>

    <!-- <PlacementComponent choice={fileData}  choiceList={[]} {saveChanges} ></PlacementComponent> -->
    <!-- Placement: Let this be moved up and down -->
    <div>
        Placement buttons
    </div>
    
    


</div>