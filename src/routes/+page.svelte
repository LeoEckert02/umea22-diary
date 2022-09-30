<script>
    import { onMount } from "svelte";
    import Grid from "../components/grid.svelte";
    import Dropdown from "../components/dropdown.svelte";
    import { chosenMonth, imageData, fetchImages, isPhone, loaded } from "../stores/stores"
    import { ScaleOut } from 'svelte-loading-spinners'

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
    {#if !$loaded}
        <div class="flex justify-center">
            <ScaleOut size="30" color="#6fa3fc" unit="px" duration="1s"></ScaleOut>
        </div>
    {/if}
    <div class="flex justify-start font-standard pb-20 w-full">
        <Grid></Grid>
    </div>
</div>
