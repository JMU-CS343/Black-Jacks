document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey) {

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
      case "5":
        window.location.href = "information.html";
        break;
    }

    // Keeps focus on whatever browser you are on.
    // Not really sure if its needed but stackOverflow recs. 
    setTimeout(() => document.body.focus(), 300);
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  const shortcuts = {
    d: "deal-button",
    h: "hit-button",
    s: "stand-button",
    p: "split-button",
    x: "double-button",
    D: "deal-button",
    H: "hit-button",
    S: "stand-button",
    P: "split-button",
    X: "double-button"
  };

  if (shortcuts[key]) {
    const button = document.getElementById(shortcuts[key]);
    if (button) {
      button.click();
      button.classList.add("inverse");
      setTimeout(() => button.classList.remove("inverse"), 150);
    }
  }
});