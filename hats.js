var States = 
{
    Idle: 0,
    HidingHat: 1,
    ShowingHat: 2
};

var hats =
[
    { "title": "1. Couch Potato", "className": "hat-1" },
    { "title": "2. Naughty Boy", "className": "hat-2" },
    { "title": "3. Horny One", "className": "hat-3" },
    { "title": "4. Playboy Bunny", "className": "hat-4" },
    { "title": "5. Chief Propellerhead", "className": "hat-5" },
    { "title": "6. Papa Smurf", "className": "hat-6" },
    { "title": "7. Sir", "className": "hat-7" },
    { "title": "8. Princess", "className": "hat-8" },
    { "title": "9. Conspiracy theory believer", "className": "hat-9" },
    { "title": "10. Pastafarian", "className": "hat-10" },
    { "title": "11. Shamrock'n'Mike", "className": "hat-11" },
    { "title": "12. Saint Mike", "className": "hat-12" },
    { "title": "13. The devil in him", "className": "hat-13" },
    { "title": "14. Oompa Loompa", "className": "hat-14" },
    { "title": "15. Mad Hatter", "className": "hat-15" },
    { "title": "16. The Grand Wizard", "className": "hat-16" },
    { "title": "17. He-Who-Must-Not-Be-Named", "className": "hat-17" },
];

var hatIndex = 0;
var hatChangeTime = 30000;
var hatTimeout = null;
var titleElement = document.getElementById("hat-title");
var hatElement = document.getElementById("hat");
var nextHat = getNextHat();
var state = States.Idle;

function getNextHat()
{
    return hats[hatIndex ++ % hats.length];
}

function onBodyAnimationEnd()
{
    switch (state)
    {
        case States.HidingHat:
            showNextHat();
            break;

        case States.ShowingHat:
            state = States.Idle;
            //awaitShowingNextHat();
            break;
    }
}

function hideCurrentHat()
{
    state = States.HidingHat;
    document.body.classList.add("hiding-hat");
    document.body.classList.remove("show-hat");
}

function showNextHat()
{
    state = States.ShowingHat;
    titleElement.innerText = nextHat.title;
    hatElement.className = nextHat.className;
    document.body.classList.remove("hiding-hat");
    document.body.classList.add("show-hat");
}

function awaitShowingNextHat()
{
    hatTimeout = setTimeout(function ()
    {
        nextHat = getNextHat();
        hideCurrentHat();
    }, hatChangeTime);
}

function tryShowingNextHat()
{
    if (state !== States.Idle)
        return;

    clearTimeout(hatTimeout);
    nextHat = getNextHat();
    hideCurrentHat();
}

window.addEventListener("load", function ()
{
    document.body.addEventListener("transitionend", onBodyAnimationEnd);
    document.body.addEventListener("click", tryShowingNextHat);

    document.addEventListener("visibilitychange", function()
    {
        if (document.visibilityState !== "visible")
            return;

        tryShowingNextHat();
    });



    showNextHat();
});

