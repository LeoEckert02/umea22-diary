<script>
    import Image from "./image.svelte";
    import { imageData } from "../stores/stores"; 
</script>

<div class="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
    {#each $imageData as image}
        <Image recordId={image.id} fileName={image.image} location={image.location} date={image.date}></Image>
    {/each}
    {#if $imageData.length === 0}
        <div class="lg:h-52 lg:w-52 h-image w-image invisible"></div>
        <div class="lg:h-52 lg:w-52 h-image w-image invisible hidden md:block"></div>
        <div class="lg:h-52 lg:w-52 h-image w-image invisible hidden lg:block"></div>
    {/if}
</div>