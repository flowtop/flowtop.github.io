function toggleNotif(notifID, openNotif) {
    const thisNotif = document.querySelector("#" + notifID);
    if (openNotif) {
        thisNotif.classList.add("active");
    } else {
        thisNotif.classList.remove("active");
    }
}