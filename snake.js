import kaboom from "kaboom";

kaboom();

add([
    text("hello"),
    pos(120, 80),
]);

onClick(() => {
    addKaboom(mousePos())
})

// burp on "b"
onKeyPress("b", burp)