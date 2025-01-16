var question_name;
var type = "";
var photo_category;
var divIds = ["PDFpreview-container-1", "PDFpreview-container-2", "PDFpreview-container-3", "PDFpreview-container-4", "PDFpreview-container-5", "PDFpreview-container-6", "PDFpreview-container-7"];
var questionNum;

const photos = [];
const comments = [];

if (window.location.pathname == "/auditMeta.html") {
    checkMeta();
}

function toMainMenu() {
    window.location.href = ("../index.html");
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
                postElement.innerHTML = ` 
                <p>${question.question}</p>

                <div id = ${count + "upload-container"}>
                    <input onclick="uploadShow(${count})" type="radio" id="${count + "yes"}" name="${question_name}" value="Yes">
                    <label for="${count + "yes"}" id="Yes-text">Yes</label><br>
                </div>

                <input onclick="addCommentBox(${count});" type="radio" id="${count + "no"}" name="${question_name}" value="No">
                <label for="${count + "no"}" id="No-text">No</label><br>
                <div id = ${count + "comment"}></div>

                <input onclick="removeAll(${count})" type="radio" id="${count + "not_insp"}" name="${question_name}" value="Not Inspected">
                <label for="${count + "not_insp"}" id="Not-Inspected-text">Not Inspected</label>
                <input type="radio" id="unselected" name="${question_name}" value="unselected" checked="checked">`;
                container.appendChild(postElement);

            });
        }; 
    });
    
    
    const lineBreak = document.createElement("br");
    container.appendChild(save_button);
    container.appendChild(lineBreak);

}

function removeUpload(number) {
    let element = document.getElementById(number + "upload-container");
    let child = document.getElementById(number + "upload");
    if (element.stringify == "undefined") {
        return;
    } else {    
        element.removeChild(child);
        child = document.getElementById(number + "takePhoto");
        element.removeChild(child);
        element.removeChild(document.getElementById("orText"));
    }

}

function removeComment(number) {
    let element = document.getElementById(number + "comment");
    let child = document.getElementById(number + "comment-container");
    if (element.stringify == "undefined") {
        return;
    }
    else {        
        element.removeChild(child);
    }
}

function removeAll(number) {
    removeComment(number);
    removeUpload(number);
    
}

function addCommentBox(number) {
    if (document.getElementById(number + "comment-container") == null) {
        let commentInputBox  = document.getElementById(number + "comment");
        commentInputBox.innerHTML +=    ` 
                                        <div id= "${number + "comment-container"}">
                                            <textarea id = "${number + "comment-box"}" style="margin-bottom: 20px;" placeholder="Enter Description"></textarea>
                                        </div>
                                        `
    }
    removeUpload(number);

}

function checkEmptyphotos(number) {
    alert(document.getElementById(number + "takePhoto").innerHTML);
}



function uploadShow(number) {  
    try { 
    checkEmptyphotos(number);
    } catch {};
    if (document.getElementById(number + "upload") == null) {
            var inputBox  = document.getElementById(number + "upload-container");
            inputBox.innerHTML +=  `
                                    <button id="${number + "takePhoto"}" title="Take photo" onclick="camaraPreview(${number})"> Use Camara </button> <span id="orText">OR</span>
                                    <input id= "${number + "upload"}" type='file' class="upload" id='file' name="${number + "upload"}" multiple/></input>
                                    <img id="preview" name="${number + "photo"}" src="#" alt="Image Preview" style="display: none;"/>
                                    `
            

            questionNum = number;
    
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
            document.getElementById(number + "yes").checked = true;
    
            function addquotes(str) {
                return `"${str}"`;
            }
        }
    removeComment(number);
    
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

function quality() {
    window.location.replace('quality.html');
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
                comment = document.getElementById((i+1) + "comment-box").value;
                comments.push(comment, i+1 ,formType);
            } catch (error) {
                comments.push("blank");
            }

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                documentaional_answers.push(answer);
                
            } catch (error) {break}
           
        }
    }

    else if (formType == "first-aid") {
        emergency_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {

            try {
                comment = document.getElementById((i+1) + "comment-box").value;
                comments.push(comment, i+1 ,formType);
            } catch (error) {}

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                emergency_answers.push(answer);
            } catch (error) {break} 
        }
        comments.pop();
    }

    else if (formType == "welfare") {
        welfare_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {

            try {
                comment = document.getElementById((i+1) + "comment-box").value;
                comments.push(comment, i+1 ,formType);
            } catch (error) {
                comments.push("blank");
            }

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                welfare_answers.push(answer);
            } catch (error) {break} 
        }
        comments.pop();
    }

    else if (formType == "COSSH") {
        cossh_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {

            try {
                comment = document.getElementById((i+1) + "comment-box").value;
                comments.push(comment, i+1 ,formType);
            } catch (error) {
                comments.push("blank");
            }

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                cossh_answers.push(answer);
            } catch (error) {break} 
        }
        comments.pop();
    }

    else if (formType == "equipment") {
        equipment_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {

            try {
                comment = document.getElementById((i+1) + "comment-box").value;
                comments.push(comment, i+1 ,formType);
            } catch (error) {
                comments.push("blank");
            }

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                equipment_answers.push(answer);
            } catch (error) {break} 
        }
        comments.pop();
    }

    else if (formType == "ppe") {
        ppe_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {

            try {
                comment = document.getElementById((i+1) + "comment-box").value;
                comments.push(comment, i+1 ,formType);
            } catch (error) {
                comments.push("blank");
            }

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                ppe_answers.push(answer);
            } catch (error) {break} 
        }
        comments.pop();
    }

    else if (formType == "high-risk") {
        hro_answers.length = 0;
        for  (let i = 0; i < max_question; i++) {

            try {
                comment = document.getElementById((i+1) + "comment-box").value;
                console.log(comment)
                comments.push(comment, i+1 ,formType);
            } catch (error) {
                comments.push("blank");
            }

            try {
                var answer = document.querySelector("input[name='" + "id" + i + "']:checked").value;
                hro_answers.push(answer);
            } catch (error) {break} 
        }
        comments.pop();
        
    }        

    var x = document.getElementById("overlay");
    x.style.display = "show";
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    console.log(comments);
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
    localStorage.setItem("local_comments", JSON.stringify(comments));
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
    const pdf_comments = JSON.parse(localStorage.getItem("local_comments"));

    if (pdf_photos.length > 0) {photosPresent = true};
           

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
     
                if (category == pdf_comments[j+2] && i+1 == pdf_comments[j+1]) {
                    var comment = pdf_comments[j];
                } else {
                    var comment = "no comment";
                }
                
                PDFcontainer.innerHTML +=   `
                                            <p class="pdfInnerText" class="audit-results"> ${question} <br> ${answers[i]}
                                            <br>
                                            ${comment}
                                            </p>
                                            `;
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

function PDFcalculate() {
    const pdf_documentaional_answers = JSON.parse(localStorage.getItem("local_documentaional_answers"));
    const pdf_emergency_answers = JSON.parse(localStorage.getItem("local_emergency_answers"));
    const pdf_welfare_answers = JSON.parse(localStorage.getItem("local_welfare_answers"));
    const pdf_cossh_answers = JSON.parse(localStorage.getItem("local_cossh_answers"));
    const pdf_equipment_answers = JSON.parse(localStorage.getItem("local_equipment_answers"));
    const pdf_ppe_answers = JSON.parse(localStorage.getItem("local_ppe_answers"));
    const pdf_hro_answers = JSON.parse(localStorage.getItem("local_hro_answers"));
    
    fetch('questions.json')
            .then(response => response.json())
            .then(data => {

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                let line = 10;
                //add documentation answers
                doc.text("Documentation", 10,10)
                line = nextLine(line, doc);
                for (let i = 0; i < data[0]["documentation"].length; i++) {
                    doc.text(data[0]["documentation"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_documentaional_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "documentation");
                    line = checkForPhoto(doc,line, i, "documentation");

                }
                line = nextLine(line, doc);
                //add first-aid answers
                doc.text("first-aid", 10,line)
                line = nextLine(line, doc);
                for (let i = 0; i < data[1]["first-aid"].length; i++) {
                    doc.text(data[1]["first-aid"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_emergency_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "first-aid");
                }
                line = nextLine(line, doc);
                //add welfare answers
                doc.text("welfare", 10,line)
                line = nextLine(line, doc);
                for (let i = 0; i < data[2]["welfare"].length; i++) {
                    doc.text(data[2]["welfare"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_welfare_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "welfare");
                }
                line = nextLine(line, doc);
                //add COSSH answers
                doc.text("COSSH", 10,line)
                line = nextLine(line, doc);
                for (let i = 0; i < data[3]["COSSH"].length; i++) {
                    doc.text(data[3]["COSSH"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_cossh_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "COSSH");
                }
                line = nextLine(line, doc);
                //add equipment answers
                doc.text("equipment", 10,line)
                line = nextLine(line, doc);
                for (let i = 0; i < data[4]["equipment"].length; i++) {
                    doc.text(data[4]["equipment"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_equipment_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "equipment");
                }
                line = nextLine(line, doc);
                //add ppe answers
                doc.text("ppe", 10,line)
                line = nextLine(line, doc);
                for (let i = 0; i < data[5]["ppe"].length; i++) {
                    doc.text(data[5]["ppe"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_ppe_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "ppe");
                }
                line = line + 10;
                //add high-risk answers
                doc.text("high-risk", 10,line)
                line = nextLine(line, doc);
                for (let i = 0; i < data[6]["high-risk"].length; i++) {
                    doc.text(data[6]["high-risk"][i]["question"], 10, line);
                    line = nextLine(line, doc);
                    try {doc.text(pdf_hro_answers[i], 10, line);} catch (error) {doc.text("No answer", 10, line);}
                    line = nextLine(line, doc);
                    line = checkForComment(doc,line, i, "high-risk");
                }

                doc.save("a4.pdf");
            }
    )    
}

function checkForComment(doc,line, question, category){
    const pdf_comments = JSON.parse(localStorage.getItem("local_comments"));
    for (let i = 2; i < pdf_comments.length; i+=3) {

        if(pdf_comments[i] == category && pdf_comments[i-1]-1 == question) {
            doc.text(pdf_comments[i-2], 10, line);
            line = nextLine(line, doc);
        }
    }
    return line;
}

function removeDataPrefix(inputString) {
    let cleanedString = inputString.replace(/^"data:image[^;]+;base64,/, '').replace(/"/g, '');
    return cleanedString;
  }

function checkForPhoto(doc,line, question, category) {
    const pdf_photos = JSON.parse(localStorage.getItem("local_photos"));

    for (let i = 2; i < pdf_photos.length; i+=3) {
        if(pdf_photos[i]-1 == question && pdf_photos[i-1] == category) {
            pdf_photos_encoded = removeDataPrefix(pdf_photos[i-2]);
            
            let img = new Image();
            img.src = pdf_photos[i-2].substring(1, pdf_photos[i-2].length-1);

            var width = 0;
            var height = 0;
            img.decode().then(() => {
                width = img.width;
                height = img.height;
            });

            doc.addImage(pdf_photos_encoded, 'JPEG', 50, 10, width, height);

            line = nextLine(line + (height/2), doc);
        }
    }
    return line;
}

function nextLine(line, doc){
    line += 5;
    
    if (line > 250) {
        doc.addPage();
        line = 10;
    };

    return line;
}

async function downloadSplash() {
    document.getElementById("downloadSplash").style.display = "block";
}

function downloadComplete() {
    document.getElementById("downloadSplash").style.display = "none";
    
    window.location.href = "auditMeta.html";
}

document.getElementById("take-photo-button").addEventListener("click", function() {
    let imageTaken = localStorage.getItem("takenPhotos");
    photos.push(imageTaken, photo_category, questionNum);

    document.getElementById(questionNum + "takePhoto").innerHTML = "Photo taken!"
});