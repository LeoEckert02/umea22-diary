<script>
    import "../app.css";
    import { error, success } from "../stores/stores"
    import Navbar from "../components/navbar.svelte";
    import Footer from "../components/footer.svelte";
    import Error from "../components/error.svelte";
    import Success from "../components/success.svelte";
    import { lightTheme } from "../stores/stores";
 </script>
  
<svelte:head>
  <title>Umeå22</title>
</svelte:head>

<div class="relative" data-theme={ $lightTheme }>
  <div class="min-h-screen">
    <Navbar />
    <div class="md:p-8 pt-5 md:m-auto w-full font-standard flex justify-center">
      <slot />
    </div>
  </div>
  
  {#if $error}
  <div class="mx-4 md:mx-auto md:w-3/5 lg:px-24 lg:w-5/12 inset-x-0 sticky bottom-4">
    <Error />
  </div>
  {/if}
  {#if $success}
  <div class="mx-4 md:mx-auto md:w-3/5 lg:px-24 lg:w-5/12 inset-x-0 sticky bottom-4">
    <Success />
  </div>
  {/if}
  <div class="flex justify-center">
    <Footer />
  </div>
</div>
