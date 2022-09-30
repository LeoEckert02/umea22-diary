<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { language, loggedIn } from '../stores/stores';
    import { apiUrl } from '../config';

    export let post;

    let img;
    let loaded = false;
    let isAcross = false;
    let editMode = false;

    let newLocation;
    let newTimeDate;
    let newCaptionEnglish;
    let newCaptionGerman;

    const imageUrl = apiUrl + '/api/files/post/' + post.id + '/' + post.image;

    function across(image) {
        return image.width > image.height;
    }

    function enterEditMode() {
        newLocation = post.location;
        editMode = true;
    }

    onMount(async () => {
        img = new Image();
        img.src = imageUrl;
        isAcross = across(img);
        loaded = true;
    });
</script>

{#if loaded}
{#if isAcross}
    <div class="grid grid-cols-1 md:w-5/12 gap-x-7 mb-5">
        <img class="rounded-md shadow-xl justify-start" src={ imageUrl } alt="post">
        <div class="text-3xl text-primary pb-4 pt-4 md:pt-0 inline-flex">{ post.location }</div>
        <div>
            <div class="rounded-sm badge bg-secondary-focus border-secondary-focus text-secondary-content">{ post.date } | { post.time }</div>
            {#if $language === 'de'}
            <div class="py-3">{post.captionGerman}</div>
            {:else}
            <div class="py-3">{post.captionEnglish}</div>
            {/if}
        </div>  
    </div>
{:else}
    <div class="grid grid-cols-1 md:grid-cols-2 md:w-7/12 gap-x-5 mb-5">
        <img class="row-span-3 rounded-md shadow-xl justify-start" src={ imageUrl } alt="post">
        <div class="text-3xl text-primary pb-4 pt-4 md:pt-0 inline-flex">{ post.location }</div>
        <div>
            <div class="rounded-sm badge bg-secondary-focus border-secondary-focus text-secondary-content">{ post.date } | { post.time }</div>
            {#if $language === 'de'}
            <div class="py-3">{post.captionGerman}</div>
            {:else}
            <div class="py-3">{post.captionEnglish}</div>
            {/if}
        </div>  
    </div>
{/if}
{/if}