function loadJS(FILE_URL, async = true) {
  let scriptEle = document.createElement("script");

  scriptEle.setAttribute("src", FILE_URL);
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", async);

  document.body.appendChild(scriptEle);
  // success event
  scriptEle.addEventListener("load", () => {
    console.log("File loaded");
    var noSleep = new NoSleep();
    var toggleEl = document.getElementById("DisplayOnOffSwitch");
    toggleEl.addEventListener('click', function () {
        if (document.getElementById("DisplayOnOffSwitch").checked) {
            noSleep.enable(); // keep the screen on!
        } else {
            noSleep.disable(); // let the screen turn off.
        }
    }, false);

  });
   // error event
  scriptEle.addEventListener("error", (ev) => {
    console.log("Error on loading file", ev);
    return false
  });
}

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
        if (element == null || (document.getElementById("DisplayOnOffSwitch") === undefined)){
            var outputText = "";
            console.log("DisplayOnOffSwitch is undefined");
        } else {
            var outputText = "<label class='switch'><input type='checkbox' id='DisplayOnOffSwitch'><span class='slider round'></span></label>\n"
            console.log("DisplayOnOffSwitch is defined");
        }
        for (const line in lines) {
            //regex to find chords in line "\[[^\[\]]*\]"//
            const regex = new RegExp(`\\${config.chordStart}${config.chordStart}^\\${config.chordStart}\\${config.chordEnd}${config.chordEnd}*\\${config.chordEnd}`, 'g');
            let match;
            let slicePart = []
            let length = 0;
            outputText += "<p class='chord'>";
            while ((match = regex.exec(lines[line])) !== null) {
                if (slicePart.length == 0) {
                    outputText += " ".repeat(match.index) + match[0].replace(config.chordStart,"").replace(config.chordEnd,"");
                } else {
                    outputText += " ".repeat(match.index-length+17-outputText.split("\n").splice(-1)[0].length) + match[0].replace(config.chordStart,"").replace(config.chordEnd,"")
                }
                slicePart.push(match[0]);
                length += match[0].length;
            }
            outputText += "</p>\n";
            for (const part in slicePart) {
                lines[line] = lines[line].replace(slicePart[part], "");
            }
            outputText += lines[line];
            outputText += "\n";
        }
        outputText = ["<p>",outputText.replaceAll("\n", "</p><p>"),"</p>"].join("");
        if (element != null) {
            element.innerHTML = outputText;
            element.style.fontSize = config.fontsize;
            element.style.lineHeight = config.lineSpace;
            loadJS("static/assets/js/NoSleep.js", false)
        } else
        {
            return outputText;
        }
    }



}

const MDCHORDSJS = new MarkdownChordsJS();
window.MDCHORDSJS = MDCHORDSJS;
