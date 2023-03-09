<script>
    import { onMount } from "svelte";
    import { select, selectAll } from "d3-selection";
    import { line, curveBasis } from "d3-shape";

    export let data;
    let d3 = {
        select,
        selectAll,
        line,
        curveBasis,
    };

    let width = 0;
    let height = 2900;

    let drawObj = {
        isDrawing: false,
        dataPoints: [],
        currentPath: null,
    };

    let svg;
    let color = "rgba(0, 0, 0, 1)";
    $: {
        if (drawObj.currentPath) {
            drawObj.currentPath.attr("stroke", color);
        }
    }

    function handleMouseDown(d) {
        drawObj.isDrawing = true;
        drawObj.dataPoints.push([d.x - 10, d.y - 10, color]);
    }

    function handleMouseMove(d) {
        if (drawObj.isDrawing) {
            drawObj.dataPoints.push([d.x - 10, d.y - 10, color]);
        }

        if (!drawObj.currentPath) {
            drawObj.currentPath = d3
                .select(svg)
                .append("path")
                .style("stroke-width", 10)
                .style("fill", "none")
                .attr("stroke", color)
                .style("stroke-linecap", "round");
        }

        drawObj.currentPath
            .datum(drawObj.dataPoints)
            .attr("d", d3.line().curve(d3.curveBasis));
    }

    function handleMouseUp() {
        let result = null;
        let dataPoints = drawObj.dataPoints;
        async function doPost() {
            const res = await fetch("/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ dataPoints }),
            });

            const json = await res.json();
            result = JSON.stringify(json);
        }
        doPost();

        drawObj.isDrawing = false;
        drawObj.dataPoints = [];
        drawObj.currentPath = null;
    }

    const transformedObj = data.posts.map((obj) => {
        const color = obj.dataPoints[0][2];

        let path = `M${obj.dataPoints[0][0]},${obj.dataPoints[0][1]}`;

        for (let i = 1; i < obj.dataPoints.length; i++) {
            const [x, y] = obj.dataPoints[i];
            path += `L${x},${y}`;
        }

        return {
            id: parseInt(obj._id),
            color: color,
            path: path,
        };
    });
</script>

<div bind:clientWidth={width} class="container">
    <svg
        {width}
        {height}
        bind:this={svg}
        on:mousemove={handleMouseMove}
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp}
    >
        {#each transformedObj as d}
            <path
                stroke={d.color}
                style="stroke-width: 10; fill: none; stroke-linecap: round;"
                d={d.path}
            />
        {/each}
    </svg>

    <section id="colorSwatch">
        <input
            type="radio"
            name="color"
            id="color01"
            bind:group={color}
            value="rgb(191, 0, 255)"
        /> <label style="background:rgb(191, 0, 255)" for="color01" />
        <input
            type="radio"
            name="color"
            id="color02"
            bind:group={color}
            value="rgba(255, 0, 254, 1)"
        /> <label style="background:rgba(255, 0, 254, 1)" for="color02" />
        <input
            type="radio"
            name="color"
            id="color03"
            bind:group={color}
            value="rgba(255, 0, 127, 1)"
        /><label style="background:rgba(255, 0, 127, 1)" for="color03" />
        <input
            type="radio"
            name="color"
            id="color04"
            bind:group={color}
            value="rgba(255, 0, 0, 1)"
        /> <label style="background:rgba(255, 0, 0, 1)" for="color04" />
        <input
            type="radio"
            name="color"
            id="color05"
            bind:group={color}
            value="rgba(255, 127, 0, 1)"
        /> <label style="background:rgba(255, 127, 0, 1)" for="color05" />
        <input
            type="radio"
            name="color"
            id="color06"
            bind:group={color}
            value="rgba(254, 255, 0, 1)"
        /> <label style="background:rgba(254, 255, 0, 1)" for="color06" />
        <input
            type="radio"
            name="color"
            id="color07"
            bind:group={color}
            value="rgba(0, 255, 0, 1)"
        /> <label style="background:rgba(0, 255, 0, 1)" for="color07" />
        <input
            type="radio"
            name="color"
            id="color08"
            bind:group={color}
            value="rgba(0, 255, 127, 1)"
        /> <label style="background:rgba(0, 255, 127, 1)" for="color08" />
        <input
            type="radio"
            name="color"
            id="color09"
            bind:group={color}
            value="rgb(0, 204, 255)"
        /> <label style="background:rgb(0, 204, 255)" for="color09" />
        <input
            type="radio"
            name="color"
            id="color10"
            bind:group={color}
            value="rgb(0, 102, 255)"
        /> <label style="background:rgb(0, 102, 255)" for="color10" />
        <input
            type="radio"
            name="color"
            id="color11"
            bind:group={color}
            value="rgb(25, 0, 255)"
        /> <label style="background:rgb(25, 0, 255)" for="color11" />
        <input
            type="radio"
            name="color"
            id="color12"
            bind:group={color}
            value="rgba(0, 0, 0, 1)"
            checked
        /> <label style="background:rgba(0, 0, 0, 1)" for="color12" />
        <input
            type="radio"
            name="color"
            id="color13"
            bind:group={color}
            value="rgba(255, 255, 255, 1)"
        /> <label style="background:rgba(255, 255, 255, 1)" for="color13" />
        <input
            type="radio"
            name="color"
            id="color14"
            bind:group={color}
            value="gainsboro"
        /><label style="background:gainsboro" for="color14" />
        <p class="info">Feel free to leave some drawings</p>
    </section>
</div>

<style>
    .container {
        height: 100vh;
        overflow: hidden;
        font-family: sans-serif;
        background-color: white;
    }

    svg {
        cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGxmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDgtMjVUMTU6Mzk6MzgrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA4LTI1VDE1OjQzOjE1KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA4LTI1VDE1OjQzOjE1KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4YzJlMmFjLWM3NTctNDUwNS04YmU2LWMxNjU0MGQyYjQwZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjRmNzIzN2RhLTdjNzMtYWQ0YS05MzU3LTYyZjhkMDM0NTUyYiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmFhNTMxODUxLWU0N2MtNGI3NC1hMWIxLWNhOGMyMTA2ODYyZiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWE1MzE4NTEtZTQ3Yy00Yjc0LWExYjEtY2E4YzIxMDY4NjJmIiBzdEV2dDp3aGVuPSIyMDIwLTA4LTI1VDE1OjM5OjM4KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NWQwM2VhNWEtMGY2Yi00YWJjLTlkNjYtNTZkMTM1NzA4Y2FmIiBzdEV2dDp3aGVuPSIyMDIwLTA4LTI1VDE1OjM5OjU1KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzhjMmUyYWMtYzc1Ny00NTA1LThiZTYtYzE2NTQwZDJiNDBmIiBzdEV2dDp3aGVuPSIyMDIwLTA4LTI1VDE1OjQzOjE1KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4JrV9j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"),
            pointer;
    }

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
