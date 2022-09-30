<script>
    import { chosenMonth, fetchImages, imageData } from "../stores/stores"
    import { monthMap } from "../month"
	import { onMount } from "svelte";

    function setChosenMonth(month) {
        chosenMonth.set(month);
        fetchImages($chosenMonth);
        setTimeout(() => { localStorage.setItem("chosenMonth", month) }, 1000);
    }

    onMount(async () => {
        let localMonth = localStorage.getItem("chosenMonth");
        if (localMonth) {
            chosenMonth.set(parseInt(localMonth));
        } else {
            chosenMonth.set(7);
        }
    });

</script>

<div class="dropdown mb-4">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label tabindex="0" class="text-primary mb-2 flex">
        <div class="text-3xl text-primary">{ monthMap.get($chosenMonth) }</div>
        <div class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
              </svg>
        </div>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow-md bg-base-100 rounded-md w-52 animate-none">
      <li><a class="rounded-md" on:click={() => setChosenMonth(7)} href="/">august</a></li>
      <li><a on:click={() => setChosenMonth(8)} href="/">september</a></li>
      <li><a on:click={() => setChosenMonth(9)} href="/">october</a></li>
      <li><a on:click={() => setChosenMonth(10)} href="/">november</a></li>
      <li><a on:click={() => setChosenMonth(11)} href="/">december</a></li>
      <li><a on:click={() => setChosenMonth(0)} href="/">january</a></li>
    </ul>
  </div>