<script>
    import PocketBase from 'pocketbase';
    import { loggedIn } from '../../stores/stores';
    import { goto } from '$app/navigation';
    import { apiUrl } from '../../config';
    import { setSuccess, setError } from '../../stores/stores'
 
    const client = new PocketBase(apiUrl);

    let username = ''; 
    let password = '';

    $: submit = async () => {
        try {
            const authData = await client.admins.authViaEmail(username, password);
            loggedIn.set(true);
            console.log(authData);
            setSuccess('successfully logged in!');
            goto('/upload');
        } catch(e) {
            setError('login credentials wrong!')
            username = '';
            password = '';
        }
    }
</script>

{#if $loggedIn }
<div class="lg:px-16 md:w-3/5 lg:w-6/12 pb-20 mx-7">
    <div class="text-3xl text-primary pb-4">login</div>
    <p>you are already logged in</p>
</div>
{:else}
<div class="mx-7 md:mx-auto md:w-3/5 lg:px-24 lg:w-5/12 w-full">
    <div class="text-3xl text-primary pb-4">login</div>
    <form on:submit|preventDefault={submit} action="/upload">
        <p class="my-2">username</p>
        <input bind:value={username} label="Username" required type="username" placeholder="username" class="rounded-sm mb-1 input input-bordered w-full" />
        <p class="my-2">password</p>
        <input bind:value={password}  label="Password" required type="password" placeholder="password" class="rounded-sm mt-1 input input-bordered w-full" />

        <button type="submit" class="rounded-sm animate-none text-white mt-5 btn border-none normal-case bg-primary w-full">
                login
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="my-auto bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                  </svg>
        </button>
    </form>
</div>
{/if}