<script>
    import Draw from "../components/Draw.svelte";
    export let data;
</script>

<div>
    <Draw {data} />
</div>

<style>
    :global(body)  {
        margin: 0;
    }
    div {
        height: 100vh;
    }
</style>
