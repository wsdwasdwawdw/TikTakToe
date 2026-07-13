(() => {
    const savedTheme = localStorage.getItem("data-theme") || "default";

    function themeSelector(){
        document.documentElement.setAttribute("data-theme", savedTheme);
        localStorage.setItem("data-theme", savedTheme);
    }

    themeSelector();
})();