const Quickrep = {
    routes: {},
    styles: {},
    currentRoute: "/",

    createComponent: function (tag, props, children, styles = null) {
        const uniqueClass = `class-${Math.random().toString(36).substring(2, 10)}`;
        
        if (styles) {
            this.styles[uniqueClass] = styles;
            props = { ...props, class: uniqueClass };
        }

        return { tag, props, children, uniqueClass };
    },

    defineRoutes: function (routes) {
        this.routes = routes;
        window.onpopstate = () => this.navigate(location.pathname, true);
    },

    navigate: function (path, isBack = false) {
        if (!this.routes[path]) return;
        
        if (!isBack) history.pushState({}, "", path);

        const container = document.getElementById("app");
        container.classList.add("fade-out");
        
        setTimeout(() => {
            container.innerHTML = "";
            this.render(this.routes[path](), container);
            container.classList.remove("fade-out");
            container.classList.add("fade-in");
        }, 500);
    },

    render: function (component, container) {
        container.innerHTML = "";
        this._updateDOM(component, container);
        this.applyStyles();
    },

    applyStyles: function () {
        let styleSheet = document.getElementById("quickrepStyles");
        if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.id = "quickrepStyles";
            document.head.appendChild(styleSheet);
        }

        let styleText = `
            .fade-out { opacity: 0; transform: translateY(10px); transition: opacity 0.5s, transform 0.5s; }
            .fade-in { opacity: 1; transform: translateY(0); transition: opacity 0.5s, transform 0.5s; }
        `;

        Object.keys(this.styles).forEach(selector => {
            styleText += `.${selector} { ${this.styles[selector]} } `;
        });

        styleSheet.innerHTML = styleText;
    },

    _updateDOM: function (node, parent) {
        if (typeof node === "string") {
            parent.appendChild(document.createTextNode(node));
            return;
        }

        const el = document.createElement(node.tag);
        if (node.props) {
            Object.keys(node.props).forEach(key => el.setAttribute(key, node.props[key]));
        }

        if (node.children) {
            node.children.forEach(child => this._updateDOM(child, el));
        }

        parent.appendChild(el);
    }
};
