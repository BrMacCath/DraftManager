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
    function handleChange(e){
        moveType =e.target.value;
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
                Move Type
            </h2>
        </div>
        <div >
            What is the default move type for this folder?
        </div>
    </div>
    <div  class="vert-stack" >
        <div>

        </div>
        <div class="select">
            <select bind:value={moveType} onchange={handleChange}>
                {#each moveTypeChoices as moveTypeChoice}
                    <option value={moveTypeChoice}>{moveTypeChoice}</option>                
                {/each}
            </select>
        </div>
    </div>
    
</div>