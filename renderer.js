const { remote } = require('electron'); // Load remote module - Remote module needed for titlebar button controls like maximize, close

document.addEventListener('DOMContentLoaded', () => { // Access DOMContent

    // Assign variable to the button for creating new file (New editor window)
    element = document.getElementById("new-window-btn"); 
    element.addEventListener("click", NewWindow, true); // Added Event listener for creating new file (New editor window)

    cls_btn = document.getElementById("bigcardclosebtn"); // Close button inside the expanded new window card
    cls_btn.addEventListener("click", closeBigCardAction);


    const closeButton = document.getElementById('close-btn'); // Title bar close button
    closeButton.addEventListener('click', () => {
        window.close();
    })

    // Minimize Button - Doesnt work ATM
    const minimizeButton = document.getElementById('min-btn'); 
    minimizeButton.addEventListener('click', () => {
        remote.getCurrentWindow().maximize();
    });

    // Restore Button - Doesnt work ATM
    const restoreButton = document.getElementById('restore-btn');
    restoreButton.addEventListener('click', () => {
        const window = remote.getCurrentWindow();
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });

    // FUNCTIONS -->

    function NewWindow() { // Create a new window after asking out new file name

         // Hide open new window button
        document.getElementById("open-file-btn").classList.add("hide");

        const hideWindowText = document.getElementById("new-window-txt");
        hideWindowText.classList.replace("show", "hide", true); // Hide the "New Window" text
        element.classList.replace("card", "bigcard"); // Remove the small card CSS
        element.disabled = true; // Disable the click function once the` card expands
        element.removeEventListener("click", NewWindow, false); // Disable click response

        // CSS changes for new file name field
        const inputnamefield = document.getElementById('newname'); 
        inputnamefield.classList.replace("hide", "show");
        inputnamefield.id = "newname";


        // Actions after clicking the close button inside the 
        const bigcardclosebtn = document.getElementById('bigcardclosebtn')
        bigcardclosebtn.classList.remove("hide");
        bigcardclosebtn.classList.add("show");
        bigcardclosebtn.id = "bigcardclosebtn";

    }

    // Revert changes made in NewWindow() functions --> Return to previous state
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