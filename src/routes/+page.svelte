<script>
    import { onMount } from "svelte";
    import Grid from "../components/grid.svelte";
    import Dropdown from "../components/dropdown.svelte";
    import { chosenMonth, imageData, fetchImages, isPhone, loaded } from "../stores/stores"

    const lengthOfNonePhoneScreen = 768;

    function isPhoneUsed() {
        return window.innerWidth < lengthOfNonePhoneScreen;
    }

    onMount(async () => {
        fetchImages($chosenMonth);
        isPhone.set(isPhoneUsed());
    });
</script>

<div class="mx-7">
    <div class="flex justify-start align-middle">
        <Dropdown></Dropdown>
    </div>
    {#if $imageData.length === 0 && $loaded}
        <p>there's nothing to see here yet... </p>
    {/if}
    <div class="flex justify-start font-standard pb-20 w-full">
        <Grid></Grid>
    </div>
</div>
