class MarkdownChordsJS{
    constructor() {
        this.chord = null;
        this.chordName = null;
        this.chordType = null;
        this.chordNotes = null;
        this.chordNotesArray = null;
        this.chordNotesArrayLength = null;

    };

    renderChord(element=null, mdtext, config=null) {
        if (config == null) {
            config = {
                chordStart: "[",
                chordEnd: "]",
                fontsize: "1.5em",
                lineSpace: "0.8"
            }
        }
        const lines = mdText.split('\n');
        // for every line in the mdtext, for every config.chordStart in line return charakter in line//
        let outputText = "";
        for (const line in lines) {
            //regex to find chords in line "\[[^\[\]]*\]"//
            const regex = new RegExp(`\\${config.chordStart}${config.chordStart}^\\${config.chordStart}\\${config.chordEnd}${config.chordEnd}*\\${config.chordEnd}`, 'g');
            let match;
            let slicePart = []
            let length = 0;
            outputText += "<div class='chord'>";
            while ((match = regex.exec(lines[line])) !== null) {
                if (slicePart.length == 0) {
                    outputText += " ".repeat(match.index) + match[0].replace(config.chordStart,"").replace(config.chordEnd,"");
                } else {
                    outputText += " ".repeat(match.index-length+19-outputText.split("\n").splice(-1)[0].length) + match[0].replace(config.chordStart,"").replace(config.chordEnd,"")
                }
                slicePart.push(match[0]);
                length += match[0].length;
            }
            outputText += "</div>\n";
            for (const part in slicePart) {
                lines[line] = lines[line].replace(slicePart[part], "");
            }
            outputText += lines[line];
            outputText += "\n";
        }
        console.log(outputText);
        outputText = ["<p>",outputText.replaceAll("\n", "</p><p>"),"</p>"].join("");
        console.log(outputText);
        if (element != null) {
            element.innerHTML = outputText;
            element.style.fontSize = config.fontsize;
            element.style.lineHeight = config.lineSpace;
        } else
        {
            return outputText;
        }
    }
    useRegex(input) {
        let regex = /\[.*\]/g;
        return regex.test(input);
}


}

const MDCHORDSJS = new MarkdownChordsJS();

// Attach the instance to the window object
window.myInstance = MDCHORDSJS;
