// login and logout function 
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    if (username === 'admin' && password === 'admin123') {
        document.getElementById('login-section').classList.add('hidden-section');

        document.getElementById('dashboard-section').classList.remove('hidden-section');
    } else {
        alert("Wrong Usarname or Password (Try admin & admin123)");
    }
}

// github isue status 
let status = document.getElementById("status")

let allbtn = document.querySelectorAll(".btntoggle")
//all card output container 
let outputContainer = document.getElementById("displayContainer")
// open card container 
let openCard = document.getElementById('openCard')
// closed card container 
let closedCard = document.getElementById('closedCard')
//get all display section 
let allDsiplay = document.querySelectorAll(".card-dsiplay")
// get modalContainer 
let modalContainer = document.getElementById("modalContainer")
// get loading-spinner 
let loadingSpinner = document.getElementById("loading-spinner")
// get search_input value 
let search_input = document.getElementById("search_input")
// show search info 
let searchCardCont = document.getElementById("searchCardCont")

let searchFunction = () => {
    let inputValue = search_input.value;
    if (search_input.value == "") {
        return alert("Search Word")
    }
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            searchDataDiplay(data.data)
        })
    search_input.value = "";
}

let searchDataDiplay = (data) => {
    searchCardCont.innerHTML = "";

    allDsiplay.forEach(all => all.classList.add('hidden'));

    searchCardCont.classList.remove("hidden");

    if (data.length === 0) {
        status.innerText = "0 Issues Found";
        searchCardCont.innerHTML = `<p class="text-center w-full py-10 text-gray-400">No issues match your search.</p>`;
        return;
    }

    status.innerText = `${data.length} Issues Found`;

    data.forEach(item => {
        const colorStatus = item.status.toUpperCase() == "OPEN" ? "border-green-600" : 'border-red-600';
        const priorityStatus = item.priority.toUpperCase() == 'MEDIUM' ? "bg-blue-50 text-blue-500" : item.priority.toUpperCase() == "LOW" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500";

        let searchDiv = document.createElement("div");
        searchDiv.innerHTML = `
            <div onclick="modalFucntion(${item.id})" class="card w-full h-[400px] bg-white shadow-md rounded-lg border-t-4 overflow-hidden ${colorStatus} cursor-pointer">
                <div class="p-5">
                    <div class="flex justify-between items-start mb-4">
                        <img src="${item.status.toUpperCase() === 'OPEN' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                        <span class="${priorityStatus} text-xs font-bold px-6 py-1.5 rounded-full tracking-wider">${item.priority.toUpperCase()}</span>
                    </div>
                    <h2 class="text-xl font-bold text-slate-800 mb-2">${item.title}</h2>
                    <p class="text-slate-500 text-sm mb-6 line-clamp-3">${item.description}</p>
                    <div class="flex gap-2 flex-wrap">${bugFunc(item.labels)}</div>
                </div>
                <div class="border-t border-gray-200 p-5 bg-white">
                    <div class="flex flex-col gap-2 text-slate-500 text-sm">
                        <span>#${item.id} by <span class="font-semibold text-slate-600">${item.author}</span></span>
                        <span class="text-slate-400">${item.createdAt}</span>
                    </div>
                </div>
            </div>`;
        searchCardCont.appendChild(searchDiv);
    });

    allbtn.forEach(btn => btn.classList.remove("btn-primary"));
}

let spinner = (show) => {
    loadingSpinner.classList.toggle('hidden', !show);
}

let togglebtn = (selectedBtn) => {
    console.log(selectedBtn)
    allbtn.forEach(btn => {
        btn.classList.remove("btn-primary")
        allDsiplay.forEach(all => all.classList.add('hidden'))
    })
    if (selectedBtn.innerText == 'Open') {
        openCard.classList.remove("hidden")
        status.innerText = `${openCard.childElementCount} Issues`
        searchCardCont.classList.add("hidden")
    } else if (selectedBtn.innerText == 'Closed') {
        searchCardCont.classList.add("hidden")
        closedCard.classList.remove("hidden")
        status.innerText = `${closedCard.childElementCount} Issues`
    } else if (selectedBtn.innerText == 'All') {
        outputContainer.classList.remove("hidden")
        status.innerText = `${outputContainer.childElementCount} Issues`
    } else if (selectedBtn.innerText == 'New Issue') {
        searchCardCont.classList.remove('hidden')
        status.innerText = `${searchCardCont.childElementCount} Issues Found`;
    }
    selectedBtn.classList.add("btn-primary")

}

let loadAllData = () => {
    spinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(resultDate => {
            displayContainer(resultDate.data)
        })

}

let bugFunc = (arr) => {
    const classMap = {
        "bug": "bg-red-50 text-red-500 border-red-100",
        "help wanted": "bg-yellow-50 text-yellow-600 border-yellow-100",
        "enhancement": "bg-blue-50 text-blue-600 border-blue-100"
    };

    return arr.map(item => {
        const dynamicClass = classMap[item] || "bg-gray-100 text-gray-500 border-gray-200";

        return `<span class="${dynamicClass} px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-tight">
                    ${item}
                </span>`;
    }).join(' ');
}
let modalFucntion = (id) => {
    spinner(true)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(data => {
            modalDisplay(data.data)
        })
}

let modalDisplay = (data) => {
    const colorStatus = data.status.toUpperCase() == "OPEN" ? "bg-green-600" : 'bg-red-600'
    const priorityStatus = data.priority.toUpperCase() == 'MEDIUM' ? "bg-blue-50 text-blue-500 border-blue-500" : data.priority.toUpperCase() == "LOW" ? "bg-red-50 text-red-500 border-red-500" : "bg-green-50 text-green-500 border-green-500"
    modalContainer.innerHTML = "";

    console.log(data.priority)

    let newModalDiv = document.createElement('div')
    newModalDiv.innerHTML = `
                            <div class="card w-full max-w-2xl bg-base-100 ">
                                    <div class=" space-y-4">
                                        <h2 class="card-title text-2xl font-bold">${data.title}</h2>

                                        <div class="flex items-center gap-2 text-sm text-base-content/70">
                                            <div class="badge badge-success badge-sm py-4 px-6 text-white ${colorStatus}">${data.status.toUpperCase()}</div>
                                            <span>• ${data.status} by ${data.author} • ${data.createdAt}</span>
                                        </div>

                                        <div class="flex gap-2">
                                            ${bugFunc(data.labels)}
                                        </div>

                                        <p class="mt-2 text-base-content">
                                            ${data.description}
                                        </p>

                                        <div
                                            class="grid grid-cols-2 gap-6 mt-4 bg-base-200/50 p-4 rounded-lg bg-gray-100">
                                            <div>
                                                <div class="text-sm opacity-70">Assignee:</div>
                                                <div class="font-semibold">${data.author} </div>
                                            </div>
                                            <div>
                                                <div class="text-sm opacity-70">Priority:</div>
                                                <div class="badge  font-bold ${priorityStatus} ">${data.priority.toUpperCase()} </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
    `
    modalContainer.appendChild(newModalDiv)
    my_modal_1.showModal()
    spinner(false)
}

let displayContainer = (data) => {
    status.innerText = `${data.length} Issues`
    outputContainer.innerHTML = "";
    openCard.innerHTML = "";
    data.forEach(item => {
        const colorStatus = item.status.toUpperCase() == "OPEN" ? "border-green-600" : 'border-red-600'
        const priorityStatus = item.priority.toUpperCase() == 'MEDIUM' ? "bg-blue-50 text-blue-500" : item.priority.toUpperCase() == "LOW" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"

        let validation = item.status == 'open'
        let validation2 = item.status == 'closed'
        console.log()

        if (validation) {
            let opendiv = document.createElement('div')
            opendiv.innerHTML = `
            <div onclick="modalFucntion(${item.id})"  class="card w-full h-full bg-white shadow-md rounded-lg border-t-4  overflow-hidden ${colorStatus}">

                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="${item.status.toUpperCase() === 'OPEN' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                                </div>
                                <span
                                    class=" ${priorityStatus} text-xs font-bold px-6 py-1.5 rounded-full tracking-wider">
                                    ${item.priority.toUpperCase()}
                                </span>
                            </div>

                            <h2 class="text-xl font-bold text-slate-800 leading-tight mb-2">
                                ${item.title}
                            </h2>

                            <p class="text-slate-500 text-sm mb-6">
                               ${item.description}
                            </p>
                            <div class = "flex gap-2 flex-wrap" >
                            ${bugFunc(item.labels)}
                            </div>
                        </div>

                        <div class="border-t border-gray-200 p-5 bg-white">
                            <div class="flex flex-col gap-2 text-slate-500 text-sm">
                                <div class="flex items-center gap-2">
                                <span class="font-medium text-slate-400">#${item.id}</span>
                                    <span>by <span class="font-semibold text-slate-600">${item.author}
                                    </span>
                                </span>
                                </div>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="text-slate-400 font-medium tracking-wide">${item.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            `
            openCard.appendChild(opendiv)
        } else if (validation2) {
            let closeddiv = document.createElement('div')
            closeddiv.innerHTML = `
                       <div onclick="modalFucntion(${item.id})"  class="card w-full h-full bg-white shadow-md rounded-lg border-t-4  overflow-hidden ${colorStatus}">

                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="${item.status.toUpperCase() === 'OPEN' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                                </div>
                                <span
                                    class=" ${priorityStatus} text-xs font-bold px-6 py-1.5 rounded-full tracking-wider">
                                    ${item.priority.toUpperCase()}
                                </span>
                            </div>

                            <h2 class="text-xl font-bold text-slate-800 leading-tight mb-2">
                                ${item.title}
                            </h2>

                            <p class="text-slate-500 text-sm mb-6">
                               ${item.description}
                            </p>
                            <div class = "flex gap-2 flex-wrap" >
                            ${bugFunc(item.labels)}
                            </div>
                        </div>

                        <div class="border-t border-gray-200 p-5 bg-white">
                            <div class="flex flex-col gap-2 text-slate-500 text-sm">
                                <div class="flex items-center gap-2">
                                <span class="font-medium text-slate-400">#${item.id}</span>
                                    <span>by <span class="font-semibold text-slate-600">${item.author}
                                    </span>
                                </span>
                                </div>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="text-slate-400 font-medium tracking-wide">${item.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            
            `
            closedCard.appendChild(closeddiv)
        }
        let newDiv = document.createElement("div")
        newDiv.innerHTML = `
            <div onclick="modalFucntion(${item.id})"  class="card w-full h-[400px] bg-white shadow-md rounded-lg border-t-4  overflow-hidden ${colorStatus}">
 
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="${item.status.toUpperCase() === 'OPEN' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                                </div>
                                <span
                                    class=" ${priorityStatus} text-xs font-bold px-6 py-1.5 rounded-full tracking-wider">
                                    ${item.priority.toUpperCase()}
                                </span>
                            </div>

                            <h2 class="text-xl font-bold text-slate-800 leading-tight mb-2">
                                ${item.title}
                            </h2>

                            <p class="text-slate-500 text-sm mb-6">
                               ${item.description}
                            </p>
                            <div class = "flex gap-2 flex-wrap" >
                            ${bugFunc(item.labels)}
                            </div>
                        </div>

                        <div class="border-t border-gray-200 p-5 bg-white">
                            <div class="flex flex-col gap-2 text-slate-500 text-sm">
                                <div class="flex items-center gap-2">
                                <span class="font-medium text-slate-400">#${item.id}</span>
                                    <span>by <span class="font-semibold text-slate-600">${item.author}
                                    </span>
                                </span>
                                </div>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="text-slate-400 font-medium tracking-wide">${item.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        outputContainer.appendChild(newDiv)
    })
    spinner(false)
}

loadAllData()