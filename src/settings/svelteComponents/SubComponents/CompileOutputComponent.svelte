<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";
	import type FolderArrangement from "types/FolderTypes/folderArrangement";



    interface Props{
        folder:FolderArrangement;
        fileList: FileArrangement[]
        saveChanges: () => void;
    }
    let {
        folder,
        fileList,
        saveChanges
    }:Props =$props()

    function handleChange(e){
        folder.compileOutput =e.target.value;
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
                Compile Output Option
            </h2>
        </div>
        <div >
            Where do you want the compilation to end up
        </div>
    </div>
    <div  class="vert-stack" >
        <div>

        </div>
        <div class="select">
            <select bind:value={folder.compileOutput} onchange={handleChange}>
                <option value ="">No compile output</option>
                {#each fileList as file}
                    <option value={file.name}>{file.name}</option> 
                {/each}
            </select>
        </div>
    </div>
    
</div>






