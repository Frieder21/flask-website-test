// Define a dictionary of flags, with the flag name as the key and a dictionary
// of color codes as the value. Each color dictionary has the line number as the key
// and the color code as the value.
const flags = {
    "trans": {
        "line1": "#00D2F6", // cyan
        "line2": "#FFA8B8", // pink
        "line3": "#FFFFFF", // white
        "line4": "#FFA8B8", // pink
        "line5": "#00D2F6", // cyan
        "geometry": "5:7"
    },
    "non-binary": {
        "line1": "#FCF434", // yellow
        "line2": "#FFFFFF", // white
        "line3": "#9C59D1", // purple
        "line4": "000000", // black
        "geometry": "4:5"
    }
    // Add more flags here if desired
};
const outputElement = document.getElementById("output");
outputElement.innerHTML = ""
// Choose a random flag from the dictionary
const flag = Object.keys(flags)[Math.floor(Math.random() * Object.keys(flags).length)];

// Print the flag by looping through each line and printing a block of the corresponding color
for (let i = 0; i < flags[flag].geometry.split(":")[0]; i++) {
    // Parse the color code into its red, green, and blue components
    const colorCode = flags[flag]["line" + (i + 1)];
    const red = parseInt(colorCode.substring(1, 3), 16);
    const green = parseInt(colorCode.substring(3, 5), 16);
    const blue = parseInt(colorCode.substring(5, 7), 16);
    let r = red;
    let g = green;
    let b = blue;

    // Create a string of the corresponding color
    let colorString = "";
    for (let j = 0; j < flags[flag].geometry.split(":")[1]; j++) {
        colorString += `<span style="background-color:rgb(${r}, ${g}, ${b})">&nbsp;&nbsp;&nbsp;</span>`;
    }

    // Output the color string to a <p> element
    outputElement.innerHTML += ("<p style='line-height: 0%'>" + colorString + "</p>");
}