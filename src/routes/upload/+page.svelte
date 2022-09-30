<script>
    import PocketBase from 'pocketbase';
    import { onMount } from 'svelte';
    import { loggedIn, setError, setSuccess } from '../../stores/stores';
    import { apiUrl } from '../../config';
    
    const client = new PocketBase(apiUrl);
    
    let location = '';
    let date_time = '';
    let caption_english = '';
    let caption_german = '';
    let file;
    let formData;
     
    $: submit = async () => {
        formData = new FormData();
        console.table( { location, date_time, caption_english, caption_german, file} );
        formData.append("location", location);
        formData.append("date_time", date_time.replace("T", " ") + ":00");
        formData.append("caption_english", caption_english);
        formData.append("caption_german", caption_german);
        formData.append("image", file[0]);

        try {
            const record = await client.records.create('post', formData);
            setSuccess('successfully uploaded!');
            location = '';
            date_time = '';
            caption_english = '';
            caption_german = '';
            file = null;
        } catch(e) {
            setError('upload failed!');
        }

        document.getElementById("fileInput").value = '';
        file = null;
    }

    onMount(async () => {
        formData = new FormData();;
    });

</script>
{#if !$loggedIn}
    <div class="lg:px-16 md:w-3/5 lg:w-6/12 pb-20 mx-7">
        <div class="text-3xl text-primary pb-4">upload</div>
        <p>you need to be logged in to be able to upload a post</p>
    </div>
{:else}
<div class="lg:px-16 md:w-3/5 lg:w-6/12 mx-7">
    <div class="text-3xl text-primary pb-4">
        upload
    </div>
    <div>
        <form on:submit|preventDefault={submit}>
            <p class="my-2">location</p>
            <input bind:value={location} required type="text" placeholder="location" class="rounded-sm mb-1 input input-bordered w-full" />
            <p class="my-2">date-time</p>
            <input bind:value={date_time} required type="datetime-local" class="rounded-sm mb-1 input input-bordered w-full" />
            <p class="my-2">caption german</p>
            <textarea class="rounded-sm w-full textarea textarea-bordered" bind:value={caption_german} rows="4"></textarea>
            <p class="my-2">caption englisch</p>
            <textarea class="rounded-sm w-full textarea textarea-bordered" bind:value={caption_english} rows="4"></textarea>
            <p class="my-2">image</p>
            <input bind:files={file} class="block w-full mb-1 px-3 py-1.5 text-base font-normal border border-neutral border-opacity-20
            rounded-sm" id="fileInput" type="file">
            <button type="submit" class="rounded-sm animate-none text-white mt-5 mb-24 btn w-full border-none normal-case bg-primary">
                upload
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="my-auto bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                  </svg>
            </button>
        </form>
    </div>
</div>
{/if}