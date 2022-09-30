<script>
    import { loggedIn } from '../../stores/stores';
</script>


<div class="lg:px-16 md:w-3/5 lg:w-6/12 pb-20 mx-7">
    <div class="text-3xl text-primary">logout</div>
    {#if !$loggedIn }
        <p>you've successfully logged out</p>
    {:else}
        <p>you are still logged in</p>
    {/if}
</div>