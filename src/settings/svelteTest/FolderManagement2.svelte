<script lang="ts">
    function sendM(){
        console.log("Got here");
        alert("Test");
    } 
	import Test from "./Test.svelte";
</script>

<Test sendM={sendM}></Test>
<button onclick={sendM}>Test</button>



