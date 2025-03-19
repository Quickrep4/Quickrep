
# Quickrep - A Lightweight JavaScript Framework

Quickrep is a simple JavaScript framework for **real-time DOM updates without a Virtual DOM**.  
It supports:
✅ Component-based structure  
✅ State management  
✅ Routing system  
✅ Animations (event-based, page transitions)  

## 🚀 How to Use
1. Include `quickrep.js` in your project.
2. Define components using `Quickrep.createComponent`.
3. Use `Quickrep.navigate` for routing.
4. Render components using `Quickrep.render`.

## 🎯 Example
```js
function HomePage() {
    return Quickrep.createComponent("h1", null, ["Welcome to Quickrep"]);
}

Quickrep.render(HomePage(), document.getElementById("app"));
