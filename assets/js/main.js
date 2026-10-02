(function () {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu-mobile");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    var isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
