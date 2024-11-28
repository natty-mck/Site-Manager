var question_name;
var type = "";
var photo_category;
var divIds = ["PDFpreview-container-1", "PDFpreview-container-2", "PDFpreview-container-3", "PDFpreview-container-4", "PDFpreview-container-5", "PDFpreview-container-6", "PDFpreview-container-7"];



if (window.location.pathname == "/auditMeta.html") {
    checkMeta();
}

function checkMeta() {
    let projectName = document.getElementById("proj-name");
    let date = document.getElementById("date");
    let inspector = document.getElementById("i-name");
    let reference = document.getElementById("job-ref");
    let client = document.getElementById("client");  

    let projectNameValue = localStorage.getItem("PDFaudit_name");
    let dateValue = localStorage.getItem("PDFaudit_date");
    let inspectorValue = localStorage.getItem("PDFaudit_inspectName");
    let referenceValue = localStorage.getItem("PDFaudit_jobref");
    let clientValue = localStorage.getItem("PDFaudit_client");


    projectName.value = projectNameValue;
    date.value = dateValue;
    inspector.value = inspectorValue;
    reference.value = referenceValue;
    client.value = clientValue;
}

function displayQuestions(type) {
    var exit_button =  document.getElementById('exit_overlay');
    var save_button =  document.getElementById('save_overlay');
    const container = document.getElementById('overlay');
    container.innerHTML = ""

    photo_category = type

    questions.forEach(category => {
        count = 0
        
        if (category[type]) {
            category[type].forEach(question => {
                var question_name  = "id" + count;

                if (type === "high-risk") {
                    if (count === 0) {
                        const heading = document.createElement('div');
                        heading.innerHTML = "<h1>Breaking Ground</h1>";
                        container.appendChild(heading);

                    } else if (count === 6) {
                        const heading = document.createElement('div');
                        heading.innerHTML = "<h1>Working at a height</h1>";
                        container.appendChild(heading);

                    } else if (count === 11) {
                        const heading = document.createElement('div');
                        heading.innerHTML = "<h1>Confined Spaces</h1>";
                        container.appendChild(heading);
                    } else if (count === 18) {
                        const heading = document.createElement('div');
                        heading.innerHTML = "<h1>Lifting</h1>";
                        container.appendChild(heading);
                    }
                }

                count += 1

                const postElement = document.createElement('div');
                postElement.classList.add('question')
                postElement.innerHTML = ` <p>${question.question}</p>
                <div id = ${count + "test"}>
                    <input onclick="uploadShow(${count})" type="radio" id="${count + "yes"}" name="${question_name}" value="Yes">
                    <label for="${count + "yes"}" id="Yes-text">Yes</label><br>
                </div>

                <input onclick="removeUpload(${count})" type="radio" id="${count + "no"}" name="${question_name}" value="No">
                <label for="${count + "no"}" id="No-text">No</label><br>

                <input onclick="removeUpload(${count})" type="radio" id="${count + "not_insp"}" name="${question_name}" value="Not Inspected">
                <label for="${count + "not_insp"}" id="Not-Inspected-text">Not Inspected</label>
                <input type="radio" id="unselected" name="${question_name}" value="unselected" checked="checked">`;
                container.appendChild(postElement);

            });
        }; 
    });
    
    
    const lineBreak = document.createElement("br");
    container.appendChild(save_button);
    container.appendChild(lineBreak);
    container.appendChild(exit_button);

    document.getElementsByTagName("footer").style.backgroundColor='red';
}

function removeUpload(number) {
    var element = document.getElementById(number + "test");
    var child = document.getElementById(number + "upload");
    element.removeChild(child);
}



function toggleImgAtr() {
    if  (document.getElementById("overlay").style.display == "block") {
        document.getElementById("overlay").style.display = "none";
    }


    if  (document.getElementById("imgcontributions").style.display == "block") {
        document.getElementById("imgcontributions").style.display = "none";
    } else if  (document.getElementById("imgcontributions").style.display == "" || document.getElementById("imgcontributions").style.display == "none") {
        document.getElementById("imgcontributions").style.display = "block";
    }

}

const photos = [];

function uploadShow(number) {


    var element = document.getElementById(number + "test");
    var numberOfChildren = element.getElementsByTagName('*').length
    
    if (numberOfChildren === 3) {
        var inputBox  = document.getElementById(number + "test");
        inputBox.innerHTML +=  `
                                <input id= "${number + "upload"}" type='file' class="upload" id='file' name="${number + "upload"}" multiple/></input>
                                <img id="preview" name="${number + "photo"}" src="#" alt="Image Preview" style="display: none;"/>
                                `

        document.getElementById(number + "upload").addEventListener('change', function () {
            let file = this.files[0];
            let reader = new FileReader();
    
            reader.onload = function (event) {
                let base64String = event.target.result;
                try {
                    document.getElementById('preview').src = base64String;
                    photos.push(addquotes(base64String), photo_category, number);            
                }
                catch {}
            };
    
            reader.readAsDataURL(file);
        });
    }
    document.getElementById(number + "yes").checked = true;

    function addquotes(str) {
        return `"${str}"`;
    }

}


function FormsPage() {

    var inspectorName = document.getElementById('proj-name').value;
    var date = document.getElementById('date').value;
    var inspectName = document.getElementById('i-name').value;
    var jobRef = document.getElementById('job-ref').value;
    var client = document.getElementById('client').value;
    

    localStorage.setItem("PDFaudit_name", inspectorName);
    localStorage.setItem("PDFaudit_date", date);
    localStorage.setItem("PDFaudit_inspectName", inspectName);
    localStorage.setItem("PDFaudit_jobref", jobRef);
    localStorage.setItem("PDFaudit_client", client);
    


    window.location.replace('options.html');
}

function BackStart() {
    window.location.replace('auditMeta.html');
}

function equipmentInspect() {
    //window.location.replace('equipmentInspect.html');
}

function BackOptions() {
    window.location.replace('options.html');
}

var formType;
function FormOverlay(type) {
    if  (document.getElementById("imgcontributions").style.display == "block") {
        document.getElementById("imgcontributions").style.display = "none";
    }


    formType = type;
    var x = document.getElementById("overlay");
    x.style.display = "block";
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions(type);
        })
    
}

function exit_overlay() {
    var x = document.getElementById("overlay");
    x.style.display = "show";
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
    }

}

const documentaional_answers = [];
const emergency_answers = [];
const welfare_answers = [];
const cossh_answers = [];
const equipment_answers = [];
const ppe_answers = [];
const hro_answers = [];

const max_question = 26;

function save_overlay() {
    
    if (formType == "documentation") {
        documentaional_answers.length = 0;

        for (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                documentaional_answers.push(answer);
                
            } catch (error) {break} };

            try {
                let photoElement = document.getElementById(i + "photo"); 
                if (photoElement && photoElement.src) {
                    let photoBase = photoElement.src;
                    documentaional_answers.push(photoBase);
                    console.log("Photo base added:", photoBase);
                } else {
                    console.log("Photo element not found or src is empty for id:", i + "photo");}
            } catch (error) {
                console.error("Error processing photo:", error);
            }}

    else if (formType == "first-aid") {
        emergency_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                emergency_answers.push(answer);
            } catch (error) {break} }}

    else if (formType == "welfare") {
        welfare_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                welfare_answers.push(answer);
            } catch (error) {break} }}

    else if (formType == "COSSH") {
        cossh_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                cossh_answers.push(answer);
            } catch (error) {break} }}

    else if (formType == "equipment") {
        equipment_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                equipment_answers.push(answer);
            } catch (error) {break} }}

    else if (formType == "ppe") {
        ppe_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                ppe_answers.push(answer);
            } catch (error) {break} }}

    else if (formType == "high-risk") {
        hro_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {
            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                hro_answers.push(answer);
            } catch (error) {break} }}
                

    var x = document.getElementById("overlay");
    x.style.display = "show";
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function to_excel() {
    fetch('questions.json')
    .then(response => {
        return response.json(); 
    })
    .then(data => {
        questions = data;
    });

    var csv = "forms \n" + 
            "," + JSON.stringify(questions[0]["documentation"]) + "\n Documentational form answers," + documentaional_answers + 
            "\n," + JSON.stringify(questions[1]["first-aid"]) + "\n first aid/emergency answers ," + emergency_answers +  
            "\n," + JSON.stringify(questions[2]["welfare"]) + "\n welfare answers ," + welfare_answers + 
            "\n," + JSON.stringify(questions[3]["COSSH"]) + "\n COSH answers ," + cossh_answers + 
            "\n," + JSON.stringify(questions[4]["equipment"]) + "\n  equipment answers ," + equipment_answers + 
            "\n," + JSON.stringify(questions[5]["ppe"]) +"\n PPE answers ," + ppe_answers + 
            "\n," + JSON.stringify(questions[6]["high-risk"]) + "\n High risk operations ," + hro_answers + 
            "\n\n photos," + "question type," + "question number," + "\n";

    let iteration = 0;
    for (i in photos) 
    {
        iteration = iteration + 1;

        csv = csv + (photos[i] + ",");
        if  (iteration === 3) {
            csv = csv + "\n";
            iteration = 0;
        };
    };

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'data.csv';
    hiddenElement.click();
}

function to_pdf() {
    window.location.replace('PDFpreview.html');
    localStorage.setItem("local_documentaional_answers",  JSON.stringify(documentaional_answers));
    localStorage.setItem("local_emergency_answers",  JSON.stringify(emergency_answers));
    localStorage.setItem("local_welfare_answers",  JSON.stringify(welfare_answers));
    localStorage.setItem("local_cossh_answers",  JSON.stringify(cossh_answers));
    localStorage.setItem("local_equipment_answers",  JSON.stringify(equipment_answers));
    localStorage.setItem("local_ppe_answers",  JSON.stringify(ppe_answers));
    localStorage.setItem("local_hro_answers",  JSON.stringify(hro_answers));

    var ragScore = document.querySelector('input[name="rag-score"]:checked').value;
    localStorage.setItem("PDFaudit_ragscore", ragScore);


    localStorage.setItem("local_photos", JSON.stringify(photos));
    document.body.style.zoom = "80%";
    loadPDF();
    
}

function back_to_questions() {
    window.location.replace('options.html');
}

function loadPDF() {
    
    var PDFcontainer = document.getElementById("PDFpreview-container-1");
    PDFcontainer.innerHTML +=  `<h2 style="text-align:center">Site Audit Completion</h2>
                                <br>
                                <span class="audit-meta"> Project Name: ${localStorage.getItem("PDFaudit_name")} <span> <br>
                                <span class="audit-meta"> Completed By: ${localStorage.getItem("PDFaudit_inspectName")} <span> <br>
                                <span class="audit-meta"> Date Completed: ${localStorage.getItem("PDFaudit_date")} <span> <br>
                                <span class="audit-meta"> Job Reference: ${localStorage.getItem("PDFaudit_jobref")} <span> <br>
                                <span class="audit-meta"> Client: ${localStorage.getItem("PDFaudit_client")} <span> <br>
                                <br>
                                <span class="audit-meta"> Overall RAG score: ${localStorage.getItem("PDFaudit_ragscore")} <span> <br>
                                <br>
                                <h5 style="text-align:center"> --Assessments-- </h5>
                                `;
    
    

    loadQuestions("documentation", "page1", 0, 6, "Documentation", 0);
    loadQuestions("first-aid", "page1", 1, 5, "First Aid", 0);
        
    loadQuestions("welfare", "page2", 2, 6, "Welfare", 0);
    loadQuestions("COSSH", "page2", 3, 8, "COSSH", 0);
    
    loadQuestions("equipment", "page3", 4, 10, "Equipment", 0);
    loadQuestions("ppe", "page3", 5, 2, "PPE", 0);

    loadQuestions("high-risk", "page4", 6, 6, "High-Risk", 0);
    loadQuestions("high-risk", "page5", 6, 5, "High-Risk", 6);
    loadQuestions("high-risk", "page6", 6, 7, "High-Risk", 11);
    loadQuestions("high-risk", "page7", 6, 8, "High-Risk", 18);

    loadphotos();
}


function loadQuestions(category, page, jsonindex, amountQuest, title, start) {

    
    
    const pdf_documentaional_answers = JSON.parse(localStorage.getItem("local_documentaional_answers"));
    const pdf_emergency_answers = JSON.parse(localStorage.getItem("local_emergency_answers"));
    const pdf_welfare_answers = JSON.parse(localStorage.getItem("local_welfare_answers"));
    const pdf_cossh_answers = JSON.parse(localStorage.getItem("local_cossh_answers"));
    const pdf_equipment_answers = JSON.parse(localStorage.getItem("local_equipment_answers"));
    const pdf_ppe_answers = JSON.parse(localStorage.getItem("local_ppe_answers"));
    const pdf_hro_answers = JSON.parse(localStorage.getItem("local_hro_answers"));

    const pdf_photos = JSON.parse(localStorage.getItem("local_photos"));

    if (pdf_photos.length > 0) {photosPresent = true};
           
    document.body.style.zoom = "90%";

    fetch('questions.json')
            .then(response => response.json())
            .then(data => {

                for (let i = start, j = 0; i < amountQuest, j < amountQuest*3; i++, j = j + 3) {

                    let base = "PDFpreview-container-";
                    let pageNumber = page[page.length - 1];
                    
                    let PDFcontainer = document.getElementById(base + pageNumber);


                    if (jsonindex === 0) {
                        var answers  = pdf_documentaional_answers;
                    } else if (jsonindex === 1) {
                        var answers  = pdf_emergency_answers;
                    } else if (jsonindex === 2) {
                        var answers  = pdf_welfare_answers;
                    } else if (jsonindex === 3) {
                        var answers  = pdf_cossh_answers;
                    } else if (jsonindex === 4) {
                        var answers  = pdf_equipment_answers;
                    } else if (jsonindex === 5) {
                        var answers  = pdf_ppe_answers;
                    } else if (jsonindex === 6) {
                        var answers  = pdf_hro_answers;
                    };

  
                let question = data[jsonindex][category][i]["question"];
 
                if (i == 0) {
                    PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> ${title} </h5>`;
                    if (category == "high-risk" && start ==  0){
                        PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> Breaking Ground </h5>`;
                    };
                    
                } else if (i === 6 && category == "high-risk") {
                    PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> ${title} </h5>`;
                    if (category == "high-risk" && start ==  6){
                        PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> Working at Height </h5>`;
                    };
                    
                } else if (i === 11 && category == "high-risk" &&  start == 11) {

                    PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> ${title} </h5>`;
                    if (category == "high-risk" && start ==  11){
                        PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> Confined Spaces </h5>`;
                    };
                    
                } else if (i === 18 && category == "high-risk" && start ==  18) {
                    PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> ${title} </h5>`;
                    if (category == "high-risk" && start ==  18){
                        PDFcontainer.innerHTML += `<h5 class="pdfInnerText"> Lifting </h5>`;
                    };
                    
                };
                
                PDFcontainer.innerHTML += `<p class="pdfInnerText" class="audit-results"> ${question} <br> ${answers[i]} </p>`;
                PDFcontainer.innerHTML += `<hr>`;

                };
            });
};


function loadphotos() {
    const pdf_photos = JSON.parse(localStorage.getItem("local_photos"));
    var photoContainer = document.getElementById("photoGrid-1");

    divIds.push("PDFpreview-photo-container-1");
   
    var containercount = 1;
    var count = 0;
    for (let x = 0; x < (pdf_photos.length); x = x + 3) {
        
        containercount += 1;
        count += 1;

        if (count == 12) {

            var elem = document.createElement('div');
            elem.className = 'PDFpreview-photo-container';
            elem.id = `PDFpreview-photo-container-${containercount}`;

            document.body.appendChild(elem);

            var photoGrid = document.createElement('div');
            photoGrid.id = `photoGrid-${containercount}`;
            photoGrid.className = 'photoGrid';

            elem.appendChild(photoGrid);

            photoContainer = document.getElementById(`photoGrid-${containercount}`);
            divIds.push(`PDFpreview-photo-container-${containercount}`);
            
            count = 0;
        };

        photoContainer.innerHTML += `   
                                        <div>
                                        <p class="pdfInnerText"> Type: ${pdf_photos[x+1]} <br> Question: ${pdf_photos[x+2]} </p>
                                        <img class="imgPDF" src= ${pdf_photos[x]} ></img> <br>
                                        </div>
                                    `;

        
    };

    

}

async function PDFcalculate() {
    const pdf_photos = JSON.parse(localStorage.getItem("local_photos"));
    localStorage.clear();



    document.body.style.zoom = "100%";
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait orientation, mm units, A4 size

    const margin = 0.5; // 1mm margin

    // Function to capture a div and add it to the PDF
    function addDivToPDF(divId, isFirst) {
        return new Promise((resolve) => {
            html2canvas(document.querySelector(`#${divId}`)).then(canvas => {
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = 210 - 2 * margin; // A4 width in mm minus margins
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

                // Add a new page for each div, but not for the first one
                if (!isFirst) {
                    pdf.addPage(); // Add a new page for subsequent images
                }

                // Add the image to the PDF with the specified margin
                pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight); // Position with margin
                resolve();
            });
        });
    }

    // Process each div sequentially
    const promises = divIds.reduce((promiseChain, divId, index) => {
        return promiseChain.then(() => addDivToPDF(divId, index === 0));
    }, Promise.resolve());

    promises.then(() => {
        pdf.save("download.pdf");
        downloadComplete();
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
}

async function downloadSplash() {
    document.getElementById("downloadSplash").style.display = "block";
}

function downloadComplete() {
    document.getElementById("downloadSplash").style.display = "none";
    
    window.location.href = "auditMeta.html";
}

