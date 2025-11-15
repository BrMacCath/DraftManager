<script lang="ts">
    let {
        str
    }:{
        str:string;
    } = $props();
    export {testSnippet};
</script>
<style>
    .button-test{
        background-color: aquamarine;
    }
    .exampleClass{
        border: 1px;
        position: relative;
        left: -100px;
    }
</style>

{#snippet testSnippet()}
    <h1 class="exampleClass">Large test</h1>
    <button class="button-test">Test</button>
{/snippet}