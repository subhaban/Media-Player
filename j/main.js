/**
 * main.js
 * The init script for this HTML5 Video Application
 * This app is used as a demo for creating a video application utilizing the video API
 * built into HTML5. It is inspired by Bruce Lawson's example hack for creating video captions.
 * I added the ability to associate custom callbacks with moments in time of the video.
 *
 * 
 * @NOTE: Mozilla released Popcorn and Butter for doing the same thing right after I got this working.
 * @UPDATE: Popcorn and Butter are dead. This is now useful again. I've updated it to be vanilla JS 
 * with no dependencies. by Troy Bennett 7-2010 (updated 12-2021)
 */

import {
    cueTimer
} from "./modules/cuepoints.js";


document.addEventListener("DOMContentLoaded", (e) => {



    var myCues = [

        {
            seconds: 5,
            callback: heading
        },
        {
            seconds: 6,
            callback: introposter
        },
        {
            seconds: 18,
            callback: cinnamon
        },
        {
            seconds: 20,
            callback: cinnafacts
        },
        {
            seconds: 49,
            callback: turmeric
        },
        {
            seconds: 70,
            callback: rosemary
        },
        {
            seconds: 90,
            callback: thymme
        },
        {
            seconds: 115,
            callback: ginger
        },
        {
            seconds: 137,
            callback: chilli
        },
        {
            seconds: 168,
            callback: funcwrapup
        },
        {
            seconds: 178,
            callback: cinnaorigin
        },
        {
            seconds: 259,
            callback: thanks
        }
    ];

    //this activates the cuepoints module.
    // Pass it the ID of the video to watch
    // and the array of cuepoint objects.
    cueTimer.setup("vid", myCues);

    //shortcut variables
    const vid = document.querySelector("#vid");
    const selectVid = document.getElementById("video-select");
    const selectTxt = document.querySelector("#text-track");
    const display = document.getElementById("transcript");
    const transcript_en = document.getElementById("transcript-en");
    const transcript_es = document.getElementById("transcript-es");

    //to load the video and start volume at 50%.
    vid.src = "assets/Spices.mp4";
    vid.load();
    //vid.volume = .5;
    console.log(selectVid);

    // make the select list control what video format to play 
    selectVid.addEventListener("change", (e) => {
        selectVideo(e, vid);
        vid.src = e.target.src;
    });

    selectTxt.addEventListener("change", (e) => {
        const id = e.target.value;
        selectTrack(e, vid, id);
    });

    console.log("test", transcript_en);


    transcript_en.addEventListener(
        "click",
        function (e) {

            e.preventDefault();
            webvttTranscript("captions/spices.vtt", display);

        });

    transcript_es.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            webvttTranscript("subtitles/spanish.vtt", display);

        });


});

// short cut variables for controls
const vid = document.querySelector("#vid");
//const curtimeTxt = document.querySelector("#curtimetxt");
// const durtimeTxt = document.querySelector("#durtimetxt");
const playbtn = document.querySelector('#playbtn');
const pausebtn = document.querySelector('#pausebtn');
const mutebtn = document.querySelector('#mutebtn');
const ccbtn = document.querySelector('#ccbtn');
const chbtn = document.querySelector('#chbtn');
const stopbtn = document.querySelector('#stopbtn');
const volumebtn = document.querySelector('#volumebtn');
const volumeslider = document.querySelector('#volumeslider');
const ttbtn = document.querySelector('#ttbtn');
const closebtn = document.querySelector('#closebtn');

// short cut variables for controls buttom images
const playimg = document.querySelector(".img_play");
const pauseimg = document.querySelector(".img_pause");
const stopimg = document.querySelector(".img_stop");
const pop = document.querySelector(".pop");
const title = document.querySelector(".title");
const img = document.querySelector(".thumbnail");

// short cut variables for iframe
const web = document.querySelector("#web");
const col2 = document.querySelector(".col2");

//action added to buttons
//event Listener action
//for play button
playbtn.addEventListener('click', (e) => {
    vid.play();
    playimg.src = "images/btn_playred100.png";
    pauseimg.src = "images/btn_pause100.png";
    stopimg.src = "images/btn_stop100.png";

});

//for pause button
pausebtn.addEventListener('click', (e) => {
    vid.pause();
    pauseimg.src = "images/btn_pausered100.png";
    playimg.src = "images/btn_playwt100.png";
});

//formute button
mutebtn.addEventListener('click', (e) => {
    vidMute();
});

//for stop button       
stopbtn.addEventListener('click', (e) => {
    vid.pause();
    vid.currentTime = 0;
    playimg.src = "images/btn_playwt100.png";
    pauseimg.src = "images/btn_pause100.png";
    stopimg.src = "images/btn_stopred100.png";

});

//for volume button
volumebtn.addEventListener('click', (e) => {
    volumeslider.style.visibility = "visible";
    setVolume();
});

//for volume button
volumeslider.addEventListener('click', (e) => {
    setVolume();

});


//for closed caption button
ccbtn.addEventListener('click', (e) => {
    const subtitles = document.querySelector(".subtitles");
    subtitles.style.display = "block";
    subtitles.addEventListener("change", (e) => {
        const id = e.target.value;
        selectTrack(e, vid, id);
    });
    setTimeout(() => {
        document.querySelector(".subtitles").style.display = "none";
    }, 5000);
});


//for select video button ytbutton
chbtn.addEventListener('click', (e) => {
    
    const selection = document.querySelector(".selection");
    selection.style.display = "block";
    selection.addEventListener("change", (e) => {
        selectVideo(e, vid);
        selectTrack(e, vid, id);

    });
    setTimeout(() => {
        document.querySelector(".selection").style.display = "none";
    }, 5000);
});

//for show transcript TT button
ttbtn.addEventListener('click', (e) => {
    const showTrans = document.querySelector(".show-transcript");
    // showtrans.addEventListener('click', (e) =>{
    showTrans.style.display = "block";
   
});


closebtn.addEventListener('click', (e) => {
    const showTrans = document.querySelector(".show-transcript");
    showTrans.style.display = "none";
});

////Functions for Volume control
function setVolume() {
    vid.volume = volumeslider.value / 100;
}

//function for Mute Button
function vidMute() {
    let muteimg = document.querySelector(".img_unmute");
    if (vid.muted) {
        vid.muted = false;
        muteimg.src = "images/btn_unmute100.png";
        volumeslider.value = "100";

    } else {
        vid.muted = true;
        muteimg.src = "images/btn_mutered100.png";
        volumeslider.value = "0";

    }
}

//////////////////////////////////////////////////////
//function for callbacks
function heading() {
    pop.classList.remove("hide");
    img.src = "images/samplespices.jpg";
    title.innerHTML = "Common Spices and its Benefits";
    title.style.color = "black";

}

function introposter() {
    col2.style.height = "fit-content";
    web.src = "images/spicesposter.png";
}

function cinnamon() {
    img.src = "images/cinnamon.jpg";
    title.innerHTML = "CINNAMOM";
    title.style.color = "white";
    pop.classList.remove("hide");

}


function cinnafacts() {

    web.src = "https://www.tastesoflizzyt.com/wprm_print/recipe/18003";
}


function turmeric() {

    img.src = "images/turmeric2.jpg";
    title.innerHTML = "TURMERIC";
    col2.classList.add("size");
    web.classList.add("size");
    web.src = "images/turmeric_benefits_resize.png";
    pop.classList.remove("hide");
}


function rosemary() {
    col2.classList.remove("size");
    web.classList.remove("size");
    web.src = "images/turmeric.png";
    title.innerHTML = "ROSEMARY";
    img.src = "images/rosemerry.png";
    web.src = "https://www.allrecipes.com/recipes/1072/ingredients/herbs-and-spices/herbs/rosemary/";
    pop.classList.remove("hide");
}

function thymme() {
    title.innerHTML = "THYMME";
    col2.classList.remove('size');
    web.classList.remove("size");
    img.src = "images/thymme.png";
    web.src = "https://www.acouplecooks.com/thyme-recipes/";
    pop.classList.remove("hide");


}

function ginger() {

    col2.classList.remove('size');
    web.classList.remove("size");
    title.innerHTML = "GINGER";
    img.src = "images/ginger.png";
    web.src = "https://www.happysprout.com/inspiration/growing-hydroponic-ginger/";
    pop.classList.remove("hide");
}

function chilli() {

    title.innerHTML = "CHILLI";
    img.src = "images/chilli.jpg";
    col2.classList.remove('size');
    web.classList.remove("size");
    web.src = "https://www.chilipeppermadness.com/frequently-asked-questions/the-scoville-scale/";
    pop.classList.remove("hide");

}

function funcwrapup() {
    col2.style.width = "fit-content";
    col2.style.height = "fit-content";

    pop.classList.remove("hide");
    web.src = "images/differentspices.jpg";
    img.src = "images/samplespices.jpg";
    title.innerHTML = "Eat Healthy and Stay Healthy";
    title.style.color = "black";

}

function cinnaorigin() {
    img.src = "images/cinnamon.jpg";
    title.innerHTML = "Story of Cinnamon?";
    col2.style.width = "100%";
    col2.style.height = "fit-content";
    web.src = "assets/Cinnamonstory.mp4";
    vid.src = "images/videoposter.png";
}

function thanks() {
    web.classList.add("size");
    vid.src = "images/videoposter.png";
    vid.innerHTML = "Thank You for Watching";
}