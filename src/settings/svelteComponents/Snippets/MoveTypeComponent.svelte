<script lang="ts">
	import { moveTypeChoices } from "types/choices/moveTypeChoices";

    interface Props{
        moveType:string;
        saveChanges: () => void;
    }
    let {
        moveType=$bindable(),
        saveChanges
    }:Props =$props()

</script>

<div>
    Move Type
    <select bind:value={moveType} onchange={saveChanges}>
        {#each moveTypeChoices as moveTypeChoice}
            <option value={moveTypeChoice}>{moveTypeChoice}</option>                
        {/each}
    </select>
</div>