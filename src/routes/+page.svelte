<script>
    import Draw from "../components/Draw.svelte";
    export let data;
</script>

<div>
    <Draw {data} />
</div>

<style>
    div {
        height: 100vh;
    }
</style>
