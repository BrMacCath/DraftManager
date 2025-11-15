<script lang="ts">
	import { extractTypeChoices } from "types/choices/extractTypeChoices";

    interface Props{
        extractType:string;
        saveChanges: () => void;
    }
    let {
        extractType=$bindable(),
        saveChanges
    }:Props =$props()

</script>

<div>
    Extract Type
    <select bind:value={extractType} onchange={saveChanges}>
        {#each extractTypeChoices as extractTypeChoice}
            <option value={extractTypeChoice}>{extractTypeChoice}</option>                
        {/each}
    </select>
</div>