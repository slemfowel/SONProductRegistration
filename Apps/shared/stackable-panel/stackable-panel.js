StackablePanel = function (args) {
    var stackablePanel = document.getElementById(args.name);
    var properties = {
        panel: function (data) {
            var panels = stackablePanel.querySelectorAll("div[class=\"panel\"]");
            var selectedPanel = null;

            Array.prototype.forEach.call(panels, function (panel, index) {
                if (("index" in data) && data.index == index) {
                    selectedPanel = panel;
                }
            });

            var panelObj = {
                select: function () {
                    Array.prototype.forEach.call(panels, function (panel, index) {
                        panel.removeAttribute("selected");
                    });
                    selectedPanel.setAttribute("selected", "");
                    console.log(selectedPanel);
                }
            }
            return panelObj;
        }
    };
    return properties;
};