<script>
    import { onMount } from 'svelte';
    import PocketBase from 'pocketbase';
    import { loggedIn, language, setSuccess } from '../stores/stores';
    import { apiUrl } from '../config';
    import Theme from './theme.svelte';

    const client = new PocketBase(apiUrl);
    let loaded = false;

    function logout() {
        client.authStore.clear();
        loggedIn.set(false);
        setSuccess("successfully logged out!")
    }

    // for some reason I can't use localStorage in store.js
    function updateLocalStorageLanguage() {
        if ($language === 'de') {
            language.set('en')
        } else {
            language.set('de')
        }
        localStorage.setItem("language", $language);
    }

    onMount(async () => {
		loggedIn.set(client.authStore.isValid);
        const localLanguage = localStorage.getItem("language");
        if (localLanguage) {
            language.set(localLanguage);
        } else {
            language.set("de");
        }
        loaded = true;
	});
</script>
<div class="navbar shadow-sm sticky bg-opacity-40 backdrop-blur-md top-0 z-50 bg-base-100 px-9 flex justify-center">
    <div class="md:w-8/12 lg:w-7/12 w-full place-content-between align-middle">
        <div class="flex align-middle">
        
            <a href="/" class="text-2xl flex text-base-content mt-1 font-medium">
                <span class="font-poppins">Umeå</span>
                <span class="text-primary font-poppins text-md">22</span>
            </a>

        </div>
        <div class="justify-end font-standard text-base-content hidden md:block float-right">
            {#if $loggedIn}
                <a href="/upload" class="hover:text-primary transition ease-in-out text-lg px-2">upload</a>
            {/if}
            <a href="/about" class="hover:text-primary transition ease-in-out text-lg px-2">about</a>
            {#if !$loggedIn}
                <a href="/login" class="hover:text-primary transition ease-in-out text-lg px-2">login</a>
            {:else}
                <a href="/" on:click={logout} class="hover:text-primary transition ease-in-out text-lg px-2">logout</a>
            {/if}
            {#if loaded}
                <span on:click={updateLocalStorageLanguage} class="opacity-40 cursor-pointer text-lg">{ $language }</span>
            {/if}
            <div class="align-middle inline-flex pb-1 pl-1">
                <Theme />
            </div>
        </div>
        <div class="md:hidden justify-end flex align-middle">
        {#if loaded}
                <span on:click={updateLocalStorageLanguage} class="font-standard opacity-40 m-3">{ $language }</span>
                {/if}
                <div class="align-middle inline-flex pb-1 pr-2">
                    <Theme />
                </div>
        <div class="dropdown dropdown-end align-middle md:hidden flex mt-1">
            <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="block md:hidden pr-1 ml-0 mb-2 cursor-pointer">
                    <div class="m-1 mt-2 -mr-4">
                        <svg class="fill-current" width="26px" height="26px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>70 Basic icons by Xicons.co</title><path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill=""/><path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill=""/><path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill=""/></svg>
                    </div>
                </label>
                <ul tabindex="0" class="block font-standard dropdown-content menu p-2 mt-11 -mr-3 shadow bg-base-100 rounded-md w-52">
                    {#if $loggedIn}
                        <li><a href="/upload">upload</a></li>
                    {/if}
                    <li><a href="/about">about</a></li>
                    {#if !$loggedIn}
                        <li><a href="/login">login</a></li>
                    {:else}
                        <li><a on:click={logout} href="/">logout</a></li>
                    {/if}
                </ul>
        </div>
    </div>
    </div>
</div>