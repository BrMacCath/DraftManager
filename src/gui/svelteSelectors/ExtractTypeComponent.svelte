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
    function handleChange(e:Event){
        extractType =e.target?.value;
        saveChanges()
    }
</script>


<style>
    .container{
        display: inline-block;
        height:60px;
        width: 100%;
    }
    .container div{
        width: 50%;
        float: left;
    }
    
    .vert-stack{
        height: 100%;
        display: inline-block;
    }
    .vert-stack div{
        height:45%;
        margin-top: 0%;
        width: 100%;
        padding: 0;
        
    }
    .vert-stack div h2{
        margin-top: 0;
        margin-bottom: 0;
    }
    .select select{
        float: right;
        right:0;
    }
 
</style>

<div class="container">
    <div  class="vert-stack">
        <div >
            <h2>
                Extract Type
            </h2>
        </div>
        <div >
            What is the default extract type for this folder?
        </div>
    </div>
    <div  class="vert-stack" >
        <div>

        </div>
        <div class="select">
            <select bind:value={extractType} onchange={handleChange}>
            {#each extractTypeChoices as extractTypeChoice}
                <option value={extractTypeChoice}>{extractTypeChoice}</option>                
            {/each}
        </select>
        </div>
    </div>
    
</div>


