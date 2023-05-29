const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => { // Access DOMContent

  document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('window-action', 'close');
  });

  document.getElementById('min-btn').addEventListener('click', () => {
    ipcRenderer.send('window-action', 'minimize');
  });

  document.getElementById('restore-btn').addEventListener('click', () => {
    ipcRenderer.send('window-action', 'restore');
  });

  document.getElementById('open-file-btn').addEventListener('click', async () => {
    try {
      const result = await ipcRenderer.invoke('show-open-dialog-sync');
      console.log('Selected file:', result);
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  });


  // Assign variable to the button for creating new file (New editor window) 
  /* KEEP GLOBAL SCOPE */
  element = document.getElementById("new-window-btn");
  element.addEventListener("click", NewWindow, true); // Added Event listener for creating new file (New editor window)

  cls_btn = document.getElementById("bigcardclosebtn"); // Close button inside the expanded new window card
  cls_btn.addEventListener("click", closeBigCardAction);


  // FUNCTIONS -->

  function NewWindow() { // Create a new window after asking out new file name

    // Hide open new window button
    opn_file_btn = document.getElementById("open-file-btn");
    opn_file_btn.classList.replace("show","hide");
    opn_file_btn.id = "open-file-btn";

    const hideWindowText = document.getElementById("new-window-txt");
    hideWindowText.classList.replace("show", "hide"); // Hide the "New Window" text
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

    const submit = document.getElementById("submitbtn");
    submit.classList.replace("hide", "show");
    submit.id = "submitbtn";

    submit_btn = document.getElementById("submitbtn");
    submit_btn.addEventListener("click", null);

  }

  // Revert changes made in NewWindow() functions --> Return to previous state
  function closeBigCardAction() {

    const inputnamefield = document.getElementById('newname');
    inputnamefield.classList.replace("show", "hide");

    const showWindowText = document.getElementById("new-window-txt");
    showWindowText.classList.replace("hide", "show", true);

    element.classList.replace("bigcard", "card");
    element.disabled = false;

    const bigcardclosebtn = document.getElementById('bigcardclosebtn')
    bigcardclosebtn.classList.replace("show", "hide");

    const submithide = document.getElementById("submitbtn");
    submithide.classList.replace("show", "hide");

    element.removeEventListener("click", NewWindow);

    opnfilebtn = document.getElementById("open-file-btn");
    opn_file_btn.classList.replace("hide","show");
    opn_file_btn.id = "open-file-btn";

  }

})