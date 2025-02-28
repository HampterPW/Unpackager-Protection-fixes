const FileInputButton = document.getElementById("FileInput");

const DownloadFile = true; // For developing purposes

function Output(text, type, href, downloadname) {
    let outputdiv = document.querySelector(".Output");
    if (!outputdiv) {
        outputdiv = document.createElement("div");
        outputdiv.classList.add("Output");
        document.querySelector("main").insertBefore(outputdiv, document.querySelector(".Warning"));
    }
    if (type == 'Title') {
        const titleElement = document.createElement('span');
        titleElement.textContent = text;
        outputdiv.append(titleElement);
    } else if (type == 'Error') {
        const codeElement = document.createElement('pre');
        outputdiv.append(codeElement);
        codeElement.textContent = text;
    } else if (type == 'DownloadLink') {
        const link = document.createElement('a');
        link.textContent = text;
        link.href = href;
        link.download = downloadname;
        outputdiv.append(link);
    }
}

function Downl(text, filename) {
    if (!text) { return; }
    const blob = new Blob([text], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    Output(`Download ${filename} (${(blob.size / 1000 / 1000).toFixed(2)}MB)`, "DownloadLink", blobUrl, filename);
    const a = document.createElement('a');
    a.download = filename;
    a.href = blobUrl;
    a.click();
    a.remove();
}

document.querySelector('main').removeAttribute('hidden');

FileInputButton.addEventListener('input', function (event) {
    if (FileInputButton.files.length == 0) {
        alert("Please select a packaged project");
        return;
    }
    
    const levelDropdown = document.querySelector(".LevelDropdown");
    if (!levelDropdown) {
        alert("Error: Level dropdown not found. Please check if the dropdown exists.");
        return;
    }

    const getfile = new FileReader();
    getfile.onload = function (loaded) {
        if (DownloadFile) {
            Obf(getfile.result, levelDropdown.value || "default")
                .then((downloadresult) => Downl(downloadresult, FileInputButton.files[0].name))
                .catch((error) => Output(`Error: ${error.message}`, "Error"));
        } else {
            Obf(getfile.result, levelDropdown.value || "default")
                .then((html) => {
                    const blob = new Blob([html], { type: "text/html" });
                    const bloburl = URL.createObjectURL(blob);
                    window.open(bloburl);
                })
                .catch((error) => Output(`Error: ${error.message}`, "Error"));
        }
    };

    Output(`Processing ${FileInputButton.files[0].name}...`, "Title");
    getfile.readAsText(FileInputButton.files[0]);
});
