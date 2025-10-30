<script lang="ts">
    interface Props{
		sendM: () => void;
    }
    let {
        sendM
    }:Props= $props()
</script>
<button onclick={sendM}>Test</button>