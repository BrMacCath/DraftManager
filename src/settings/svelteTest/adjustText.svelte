<script lang="ts">
interface Props{
        text:string
    }

let {text =$bindable()}:Props = $props()

</script>
<section 

>
<input bind:value={text}/> Test
</section>