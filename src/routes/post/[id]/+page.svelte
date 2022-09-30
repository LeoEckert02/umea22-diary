<script>
    import { page } from '$app/stores';
    import { imageData } from '../../../stores/stores';
    import PostInfo from '../../../components/postInfo.svelte';
    import { onMount } from 'svelte';
    import PocketBase from 'pocketbase';
    import { apiUrl } from '../../../config';

    const client = new PocketBase(apiUrl);
    
    let id;
    let post;
    let loaded = false;

    onMount(async () => {
        id = $page.params.id;
        post = $imageData.find(element => element.id === id);

        if (!post) {
            post = await client.records.getOne('post', id, {});

            let dateTime = post.date_time.split(" ");
            let date = dateTime[0].split("-").reverse().join(".");
            post = {
                id: post.id,
                image: post.image,
                captionGerman: post.caption_german,
                captionEnglish: post.caption_english,
                location: post.location,
                date,
                time: dateTime[1].slice(0, 5),
                across: post.across
            }
        }
        loaded = true
    });
</script>
    
<div class="pb-14 flex justify-center mx-7">
    {#if loaded}
    <PostInfo post={ post } />
    {/if}
</div>