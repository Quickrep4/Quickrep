function HomePage() {
    return Quickrep.createComponent(
        "div",
        null,
        [
            Quickrep.createComponent("h1", null, ["Welcome to Quickrep"]),
            Quickrep.createComponent("button", { onclick: "Quickrep.navigate('/about')" }, ["Go to About"])
        ]
    );
}

function AboutPage() {
    return Quickrep.createComponent(
        "div",
        null,
        [
            Quickrep.createComponent("h1", null, ["About Quickrep"]),
            Quickrep.createComponent("button", { onclick: "Quickrep.navigate('/')" }, ["Back to Home"])
        ]
    );
}

// Define Routes
Quickrep.defineRoutes({
    "/": HomePage,
    "/about": AboutPage
});

// Render Initial Page
Quickrep.render(HomePage(), document.getElementById("app"));
