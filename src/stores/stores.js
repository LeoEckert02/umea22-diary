import { writable } from 'svelte/store';
import { apiUrl } from '../config';
import PocketBase from 'pocketbase';

const client = new PocketBase(apiUrl);

const animationDuration = 1575;

export const loggedIn = writable(false);
export const imageData = writable([]);
export const chosenMonth = writable(7);
export const language = writable();
export const lightTheme = writable('corporate');
export const isPhone = writable(false);
export const error = writable(false);
export const success = writable(false);
export const alertText = writable('');
export const loaded = writable(false);

export function setSuccess(successText) {
    alertText.set(successText);
    success.set(true);
    setTimeout(() => { success.set(false) }, animationDuration);
}

export function setError(errorText) {
    alertText.set(errorText);
    error.set(true);
    setTimeout(() => { error.set(false) }, animationDuration);
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

export const fetchImages = async (chosenMonth) => {
    loaded.set(false);
    imageData.set([]);

    let dateStart;
    let dateEnd;
    let daysinChosenMonth;

    // there seem to be some time zone issues that i haven't quite figured out yet
    
    if (chosenMonth == 0) {
        dateStart = new Date(2023, chosenMonth, 1, 2, 0, 0);
    } else {
        dateStart = new Date(2022, chosenMonth, 1, 2, 0, 0);
    }

    daysinChosenMonth = getDaysInMonth(dateStart.getFullYear(), dateStart.getMonth() + 1);
    dateEnd = new Date(dateStart.getFullYear(), chosenMonth, daysinChosenMonth + 1, 1, 59, 59);

    // fetch a paginated records list
    const resultList = await client.records.getList('post', 0, getDaysInMonth( dateStart.getFullYear(), dateStart.getMonth() + 1), {
        filter: ('date_time >= "' + dateStart.toISOString().replace('T', ' ').split('.')[0] + '" &&' 
        + 'date_time <= "' + dateEnd.toISOString().replace('T', ' ').split('.')[0] + '"'), 
        sort: 'date_time',
    });

    loaded.set(true);

    const loadedImages = resultList.items.map((data) => {
        let dateTime = data.date_time.split(" ");
        let date = dateTime[0].split("-").reverse().join(".");
        return {
            id: data.id,
            image: data.image,
            captionGerman: data.caption_german,
            captionEnglish: data.caption_english,
            location: data.location,
            date,
            time: dateTime[1].slice(0, 5),
            across: data.across
        }
    })

    imageData.set(loadedImages);
}