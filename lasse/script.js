document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const timelineList = document.getElementById('timeline-list');
    const audioAnalysisText = document.getElementById('audio-analysis-text');
    const languageSelect = document.getElementById('language-select');
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');


    // Timeline data
    const timelineData = [
        {time: 0, description: 'Lassen loistava alku!'},
        {time: 5, description: 'Lassen leikkaus oli erinomainen!'},
        {time: 15, description: 'Lassen tehosteet ovat huikeita!'},
        {time: 30, description: 'Lassen siirtymät ovat upeita!'},
        {time: 45, description: 'Lassen värit ovat taidetta!'},
        {time: 60, description: 'Lassen täydellinen lopetus!'},
    ];

     // Generate list items based on timelineData
    timelineData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.time}s - ${item.description}`;
        listItem.addEventListener('click', () => {
           video.currentTime = item.time;
        });
        timelineList.appendChild(listItem);
    });
    // Example of Audio analysis, placeholder for now
    audioAnalysisText.textContent = "Lassen äänimaisemat ovat upeita";

   // i18n translations
   const translations = {
        en: {
            nav_about: 'About Lasse',
            nav_edit: 'Lasse\'s Edit',
            nav_process: 'Lasse\'s Process',
            nav_contact: 'Contact (Lasse!)',
            hero_headline: 'Admire Lasse!',
            hero_paragraph: 'Immerse yourself in Lasse – he\'s truly handsome! See his editing skills.',
            hero_button: 'Explore Lasse',
            about_headline: 'About Lasse',
            about_paragraph: 'Lasse is incredibly handsome and a skilled editor. This page is dedicated to his style and amazing work! See how he shines!',
            edit_headline: 'Lasse\'s Edit',
            timeline_header: 'Lasse\'s Timeline',
            audio_header: 'Lasse\'s Audio Analysis',
            audio_placeholder: 'Lasse\'s soundscapes are amazing',
             process_headline: 'Lasse\'s Process',
             contact_headline: 'Contact Lasse!',
            contact_paragraph: 'Contact Lasse to learn more or compliment his handsomeness!',
            name_placeholder: 'Your Name',
            email_placeholder: 'Your Email',
            message_placeholder: 'Tell Lasse...',
            contact_button: 'Send Message to Lasse!',
             footer_copyright: '© 2024 Page Dedicated to Lasse',
        },
        fi: {
           nav_about: 'Lassesta',
           nav_edit: 'Lassen Muokkaus',
           nav_process: 'Lassen Prosessi',
           nav_contact: 'Ota yhteyttä (Lasseen!)',
            hero_headline: 'Ihaile Lassea!',
            hero_paragraph: 'Uppoudu Lasseen – hän on todella komea! Katso hänen muokkaustaitojaan.',
            hero_button: 'Tutki Lassea',
            about_headline: 'Tietoa Lassesta',
            about_paragraph: 'Lasse on uskomattoman komea ja taitava muokkaaja. Tämä sivu on omistettu hänen tyylikkyydelleen ja upeille töilleen! Katsokaa, miten hän loistaa!',
             edit_headline: 'Lassen Muokkaus',
            timeline_header: 'Lassen Aikajana',
            audio_header: 'Lassen Äänianalyysi',
             audio_placeholder: 'Lassen äänimaisemat ovat upeita',
            process_headline: 'Lassen Prosessi',
            contact_headline: 'Ota yhteyttä Lasseen!',
             contact_paragraph: 'Ota yhteyttä Lasseen saadaksesi lisätietoja tai kehuaksesi hänen komeuttaan!',
             name_placeholder: 'Nimesi',
            email_placeholder: 'Sähköpostiosoitteesi',
             message_placeholder: 'Kerro Lasselle',
             contact_button: 'Lähetä viesti Lasselle!',
             footer_copyright: '© 2024 Lasselle Omistettu Sivu',
        }
    };

    // Initial Language
     let currentLanguage = 'en';
     languageSelect.value = currentLanguage;
     translatePage(currentLanguage);


    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = translations[lang][key] || key;
             if (element.placeholder) {
                   element.placeholder = translations[lang][key] || key;
             }
        });
    }

    // Change language
   languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
       translatePage(currentLanguage);
    });

    // Event listener to pause other panels on mouse enter video
    const allDataPanels = document.querySelectorAll('#edit .data-panel');
      video.addEventListener('mouseenter', () => {
        allDataPanels.forEach(panel => {
            panel.style.opacity = '0.5';
             panel.style.transition = 'opacity 0.3s ease-in-out';
        });
     });
      video.addEventListener('mouseleave', () => {
          allDataPanels.forEach(panel => {
            panel.style.opacity = '1';
      });
    });

    // Contact Form Handling
   form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
     const name = form.querySelector('input[type="text"]').value;
     const email = form.querySelector('input[type="email"]').value;
     const message = form.querySelector('textarea').value;

    if (!name || !email) {
       formMessage.textContent = 'Nimi ja sähköposti ovat pakollisia';
       formMessage.style.color = "red"
       return;
    }

     // Simulate a succesful submission for now ( you can make an actual server side function in the future)
     formMessage.textContent = "Viesti lähetetty Lasselle! Hän arvostaa sinua.";
     formMessage.style.color = 'green'
     form.reset()

   });
});