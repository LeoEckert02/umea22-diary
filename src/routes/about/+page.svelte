<script>
    import { language } from '../../stores/stores';
</script>

<div class="lg:px-16 md:w-3/5 lg:w-6/12 pb-20 mx-7">
    <div class="text-3xl text-primary pb-4">about</div>
    {#if $language === 'de'}
    <p>Auf dieser Seite dokumentiere ich mein Auslandssemester in Umeå, Schweden. Es soll so ein bisschen wie ein Tagebuch funktionieren. Weil ich aber nicht gerne schreib dachte ich, dass Bilder sehr viel interessanter sind. Zu jedem Bild gibts ein Datum mit Uhrzeit, einen Ort und ne kleine Caption. Ich werde aber nicht jeden Tag ein Bild posten, weil es wohl nicht super interessant ist wenn ich mal den ganzen Tag an der Uni verbracht hab. 
        Viel Spaß beim Durchschauen von den Bildern!☺️
    </p>
    {:else}
    <p>On this page I document my semester abroad in Umeå, Sweden. It should work a bit like a diary. But because I don't like to write I thought that pictures are much more interesting. For each picture there will be a date with time, a place and a little caption. But I won't post a picture every day, because it's probably not very interesting when I spent the whole day at the university. 
        Have fun looking through the pictures!☺️
    </p>
    {/if}
</div>