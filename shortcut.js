document.addEventListener("keydown", (event) => {
  if (event.altKey) {

    switch (event.key) {
      case "1":
        window.location.href = "index.html";
        break;
      case "2":
        window.location.href = "learn.html";
        break;
      case "3":
        window.location.href = "visuals.html";
        break;
      case "4":
        window.location.href = "profile.html";
        break;
    }

    // Keeps focus on whatever browser you are on.
    // Not really sure if its needed but stackOverflow recs. 
    setTimeout(() => document.body.focus(), 300);
  }
});