<script>
// @ts-nocheck
    import { apiUrl, frontendUrl } from '../config';
    import { isPhone } from '../stores/stores'; 

    export let recordId;
    export let fileName;
    export let date;
    export let location;
</script>

<a href={ frontendUrl + '/post/' + recordId }>
    <div class="group md:transition md:ease-in-out md:hover:-translate-y-1.5 shadow-md hover:shadow-lg rounded-md">
        <div class="relative">
            <img class="object-cover lg:h-52 lg:w-52 h-image w-image rounded-md transition ease-in-out" src={ apiUrl + '/api/files/post/' + recordId + '/' + fileName } alt="Test">
            {#if !$isPhone}
            <div class="absolute inset-0 flex justify-center items-center z-10">
                <div class="w-full h-full bg-none rounded-md bg-opacity-10 backdrop-blur-sm invisible group-hover:visible transition ease-in-out">
                    <div class="mt-20">
                        <div class="w-full"><span class="rounded-sm badge badge-primary table m-auto flex justify-center">{ date }</span></div>
                        <div class="w-full"><span class="flex justify-center text-white mt-1">{ location }</span></div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</a>

<div class="w-full md:hidden -mt-4 mb-2 flex">
    <span class="rounded-sm badge bg-secondary-focus border-secondary-focus table text-secondary-content">{ date }</span>
    <span class="text-base-content ml-2">{ location }</span>
</div>