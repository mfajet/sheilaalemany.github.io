window.onload = function(){
  search = window.location.search.substring(1)
  searchValues = search.split("&")
  project = {}
  searchValues.forEach((value) => {
    if(value.startsWith("project=")){
      projectName = value.substring(8)
    }
  })
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'files/projects.json', true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          projects = JSON.parse(xobj.responseText);
          project = projects[projectName];
          console.log(project)
          titleHeader = document.getElementById("project-title");
          titleHeader.innerHTML = project["title"];
          projectDescription = document.getElementById("project-description");
          projectDescription.innerHTML = project["description"];
          projectImage1 = document.getElementById("project-image-1");
          projectImage1.src = project["image1"];
          projectInfoTable = document.getElementById("project-info-table");
          for (var property in project["tableValues"]) {
              if (project["tableValues"].hasOwnProperty(property)) {
                  var row = projectInfoTable.insertRow(0);
                  var question = row.insertCell(0);
                  var answer = row.insertCell(1);
                  question.innerHTML = "<strong>" + property + "?</strong>"
                  answer.innerHTML =  project["tableValues"][property]
              }
          }
        }
  };
  xobj.send(null);
}