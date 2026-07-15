(() => {
    const themeToggle = document.querySelector(".themeSelector");
    const themes = themeToggle.querySelector(".themes");
    const btns = themes.querySelectorAll("button");

    const savedTheme = localStorage.getItem("data-theme") || "default";

    function themeSelector(){
        document.documentElement.setAttribute("data-theme", savedTheme);
        localStorage.setItem("data-theme", savedTheme);
        btns.forEach((btn) => {
            if (btn.getAttribute("data-theme") === savedTheme) {
                btn.classList.add("selected");
            } else {
                btn.classList.remove("selected");
            }
        });
    }

    themeSelector();

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedTheme = btn.getAttribute("data-theme");
            document.documentElement.setAttribute("data-theme", selectedTheme);
            localStorage.setItem("data-theme", selectedTheme);

            
            btns.forEach((b) => b.classList.toggle("selected"));
        }); 
    });

})();