const { remote } = require('electron');

document.addEventListener('DOMContentLoaded', () => {

    element = document.getElementById("new-window-btn");
    element.addEventListener("click", NewWindow, true);

    cls_btn = document.getElementById("bigcardclosebtn");
    cls_btn.addEventListener("click", closeBigCardAction);


    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', () => {
        window.close();
    })

    const minimizeButton = document.getElementById('min-btn');
    minimizeButton.addEventListener('click', () => {
        remote.getCurrentWindow().maximize();
    });

    const restoreButton = document.getElementById('restore-btn');
    restoreButton.addEventListener('click', () => {
        const window = remote.getCurrentWindow();
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });

    function NewWindow() { // Create a new window after asking out new file name


        document.getElementById("open-file-btn").classList.add("hide"); // Hide open new window button

        const hideWindowText = document.getElementById("new-window-txt");
        hideWindowText.classList.replace("show", "hide", true); // Hide the "New Window" text
        element.classList.replace("card", "bigcard"); // Remove the small card CSS
        element.disabled = true; // Disable the click function once the` card expands
        element.removeEventListener("click", NewWindow, false); // Disable click response

        const inputnamefield = document.getElementById('newname');
        inputnamefield.classList.replace("hide", "show");
        inputnamefield.id = "newname";

        const bigcardclosebtn = document.getElementById('bigcardclosebtn')
        bigcardclosebtn.classList.remove("hide");
        bigcardclosebtn.classList.add("show");
        bigcardclosebtn.id = "bigcardclosebtn";

    }

    function closeBigCardAction() {
        document.getElementById("open-file-btn").classList.replace("hide", "show");

        const inputnamefield = document.getElementById('newname');
        inputnamefield.classList.replace("show", "hide");

        const showWindowText = document.getElementById("new-window-txt");
        showWindowText.classList.replace("hide", "show", true);

        element.classList.replace("bigcard", "card");
        element.disabled = false;

        const bigcardclosebtn = document.getElementById('bigcardclosebtn')
        bigcardclosebtn.classList.replace("show", "hide");

        element.removeEventListener("click", NewWindow);

    }

})

// element.addEventListener("click", NewWindow);