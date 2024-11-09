var currentTab = 0;
showTab(currentTab);

function showTab(n) {

  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {X
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  
  fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");

    validateForm();
    
    x[currentTab].style.display = "none";
    
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
      let timerInterval;
      Swal.fire({
        title: "Localizando Indicador!",
        html: "Seu gráfico esta sendo gerado em <b></b> segundos.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          document.getElementById("regForm").submit();
          return false;
        }
      });
        
    }
    showTab(currentTab);
}

function validateForm() {

  var  valid = true;
  
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;     
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

function submitForm() {
    var region = document.querySelector('input[name="region"]:checked').value;
    var status = document.querySelector('input[name="status"]:checked').value;
    var modality = document.querySelector('input[name="modality"]:checked').value;
    var category = document.querySelector('input[name="category"]:checked').value;
    var name = "{{ name }}";

    var url = window.location.href.split('?')[0];
    url += '?region=' + encodeURIComponent(region) + "&status=" + encodeURIComponent(status) + "&modality=" + encodeURIComponent(modality) + "&category=" + encodeURIComponent(category) + "&name=" + encodeURIComponent(name);
    window.location.href = url;
}

function handleDropdownItemClick(chave, valorSelecionado) {
  
  var urlParams = new URLSearchParams(window.location.search);

  urlParams.set(chave, valorSelecionado);

  var url = window.location.origin + window.location.pathname + '?' + urlParams.toString();

  window.location.href = url;
}

function toggleGrafico() {
  var graphicContainer = document.getElementById('graphicContainer');
  var tableContainer = document.getElementById('tableContainer');
  graphicContainer.style.display = 'block';
  tableContainer.style.display = 'none';
}

function toggleTabela() {
  var graphicContainer = document.getElementById('graphicContainer');
  var tableContainer = document.getElementById('tableContainer');
  graphicContainer.style.display = 'none';
  tableContainer.style.display = 'block';
 
}

function toggleDisplay() {
  var checkbox = document.getElementById('toggleCheckbox');
  var graphicContainer = document.getElementById('graphicContainer');
  var tableContainer = document.getElementById('tableContainer');
  // alert(toggleLabel.textContent)

  if (toggleLabel.textContent == 'Tabela') {
    graphicContainer.style.display = 'none';
    tableContainer.style.display = 'block';
    toggleLabel.textContent = 'Gráfico';
    checkbox.checked = false;
   
  } else {
    graphicContainer.style.display = 'block';
    tableContainer.style.display = 'none';
    toggleLabel.textContent = 'Tabela';
    checkbox.checked = false;

  }
}
function toggleFullScreen() {
  var graphicContainer = document.getElementById('graphicContainer');

  if (!document.fullscreenElement) {
    graphicContainer.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}