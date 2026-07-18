(() => {
    const themeSelector = document.querySelector(".themeSelector");
    const themeToggle = themeSelector.querySelector(".themeToggle");
    const themes = themeSelector.querySelector(".themes");
    const btns = themes.querySelectorAll("button");

    const savedTheme = localStorage.getItem("data-theme") || "default";

    function themeSelectorFunc(){
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

    themeSelectorFunc();

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedTheme = btn.getAttribute("data-theme");
            document.documentElement.setAttribute("data-theme", selectedTheme);
            localStorage.setItem("data-theme", selectedTheme);
            btns.forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            
        }); 
    });

    themeToggle.addEventListener("click", ()=>{
        if(themeSelector.classList.contains("visible")){
            themeSelector.style.right = "-300px";
        }
        else{
            themeSelector.style.right = "0px";
        }
        themeSelector.classList.toggle("visible");
    });
})();