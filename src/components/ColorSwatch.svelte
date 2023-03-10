<script>
    export let colors = [
        { value: "rgb(191, 0, 255)" },
        { value: "rgba(255, 0, 254, 1)" },
        { value: "rgba(255, 0, 127, 1)" },
        { value: "rgba(255, 0, 0, 1)" },
        { value: "rgba(255, 127, 0, 1)" },
        { value: "rgba(254, 255, 0, 1)" },
        { value: "rgba(0, 255, 0, 1)" },
        { value: "rgba(0, 255, 127, 1)" },
        { value: "rgb(0, 204, 255)" },
        { value: "rgb(0, 102, 255)" },
        { value: "rgb(25, 0, 255)" },
        { value: "rgba(0, 0, 0, 1)" },
        { value: "rgba(255, 255, 255, 1)" },
        { value: "gainsboro" },
    ];
    export let color;
</script>

<section id="colorSwatch">
    {#each colors as { value, style, checked }}
        <input
            type="radio"
            name="color"
            id={value}
            bind:group={color}
            {value}
            {checked}
        />
        <label for={value} style="background:{value}" />
    {/each}
    <p class="info">Feel free to leave some drawings</p>
</section>

<style>
    input[type="radio"] {
        margin: 0;
        display: none;
        width: 0;
    }
    input[type="radio"]:checked + label::after {
        content: "✔";
        position: absolute;
        top: 0px;
        font-size: 1rem;
    }

    label {
        display: inline-block;
        width: 18px;
        height: 18px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 2px;
    }

    #colorSwatch {
        position: absolute;
        display: block;
        width: 100%;
        height: 30px;
        top: 0;
        left: 10;
        margin: 0.5rem;
        user-select: none;
    }

    .info {
        color: black;
        display: inline;
    }
</style>
