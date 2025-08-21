<script lang="ts">
    interface Props{
        tabs: number;
        folder: ExperimentType;
    }

    let {
        tabs,
        folder
    }:Props =$props();
    import {faFolder,faFile} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
	import type ExperimentType from "types/choices/experimentType";
    import SvelteExperimentData from "./svelteExperimentData.svelte";
</script>

<div class="Test1" >
    <Icon data={faFolder} />{folder.folder.name}
    <!-- {mount(SvelteImportStuff)} -->

</div>
{#each folder.folderArrangement as fold}
<SvelteExperimentData tabs={tabs + 5} folder={fold[0]} ></SvelteExperimentData>
{/each}


{#each folder.fileArrangement as file}
    <div class="Test2"style="margin-left:{tabs}px">
        <Icon data={faFile} /> {file[0].name}
    </div>
{/each}

<style>
    .Test1 {
        margin-left: 3px;
    }
    
</style>

