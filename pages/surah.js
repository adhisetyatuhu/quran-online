// fetch surah page
async function getSurahPage(number) {
    const url = `https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data :', data);
        return data.data;
    } catch (error) {
        console.error('Error fetching surah page:', error);
    }
}

function setSurahPageTemplate(number, text) {
    return `
        <div class="px-4 py-4 my-2 bg-white text-gray-800 shadow text-right text-3xl font-serif">
            <div class="float-left w-12 h-8 text-center text-lg border-b border-gray-300 rounded-full font-sans block-inline">${number}.</div>
            <div>${text}</div>
        </div>
        `
}

function playAudio(sounds) {
    let currentIndex = 0; // keep track of the current index
    const play = document.getElementById('play-button');
    const stop = document.getElementById('stop-button');

    sounds.forEach(function (sound) {
        sound.onended = onended; // add the same event listener for all audios in our array
    });

    function onended(evt) {
        currentIndex = (currentIndex + 1); // increment our index
        if (currentIndex >= sounds.length) {
            currentIndex = 0; // reset to the first sound
            sounds[0].pause(); // pause the first sound
            sounds[0].currentTime = 0; // reset to the beginning
        } else {
            sounds[currentIndex].play(); // play the next sound
        }
        console.log(currentIndex, "audio index");
    }

    play.onclick = function () {
        if (sounds.length > 0) {
            if (sounds[currentIndex].paused) {
                sounds[currentIndex].play();
            } else {
                sounds[currentIndex].pause();
            }
        }
    }

    stop.onclick = function () {
        sounds[currentIndex].pause();
        sounds[currentIndex].currentTime = 0; // reset to the beginning
        currentIndex = 0; // reset the index
    }
}

async function renderSurahPage(surahNumber) {
    const surahTitle = document.getElementById('surah-title');
    const page = document.getElementById('page');

    try {
        const surah = await getSurahPage(surahNumber);
        const title = surah.englishName;
        const ayahs = surah.ayahs;

        let ayahArr = [];
        let audioArr = [];
        for (let i = 0; i < ayahs.length; i++) {
            ayahArr.push(setSurahPageTemplate(ayahs[i].numberInSurah, ayahs[i].text))
            audioArr.push(new Audio(ayahs[i].audio));
        }

        surahTitle.innerText = title;
        page.innerHTML = ayahArr.join('');
        playAudio(audioArr);
    } catch (error) {

    }

}


let surahNumber = location.search.split('number=')[1]
const menu = document.getElementById('menu-button');
menu.onclick = function () {
    window.location.href = '../'
}
console.log(location.search.split('number='));
renderSurahPage(surahNumber);
