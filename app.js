//func get API
async function getSurahList() {
    const url = 'https://api.alquran.cloud/v1/surah';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Surah List:', data);
        return data.data;



    } catch (error) {
        console.error('Error fetching surah list:', error);
    }
}

//template UI Surah
function setSurahTemplate(number, arabicName, englishName, translation) {
    return `
    <div class="py-4 px-4 pb-4 pt-4 border-b border-gray-400 hover:bg-sky-100">
       <a href="pages/surah.html?number=${number}" class="text-lg">
        <div class="flex gap-4">
            <span class="">${number}.</span> ${arabicName} 
        </div>
        <div class="flex gap-4 text-sm text-gray-500">
            <span>&nbsp;</span>${englishName} (${translation})
        </div>
    </a>
    </div>`;
}



//get element list surah
async function getElementSurahList() {
    try {
        const surahList = await getSurahList();

        let surahElements = surahList.map((surah) => {
            return setSurahTemplate(surah.number, surah.name, surah.englishName, surah.englishNameTranslation);
        })
        return surahElements.join(''); a
    } catch (error) {
        return 'Error fetching surah list';
    }
}


async function renderSurahList() {
    const app = document.getElementById('app');
    const renderedSurahList = await getElementSurahList();
    app.innerHTML = renderedSurahList;
}


renderSurahList();
