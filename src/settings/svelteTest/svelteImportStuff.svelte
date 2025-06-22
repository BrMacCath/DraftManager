<script lang="ts">
    interface Props{
        tabs: number;
    }

    let {
        tabs
    }:Props =$props();

    import {faFolder,faFile} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
</script>

<div class="Test1" >
    <Icon data={faFolder} />
</div>
<div class="Test2"style="margin-left:{tabs}px">
    <Icon data={faFile} />
</div>


<style>
    .Test1 {
        margin-left: 3px;
    }
    
</style>


