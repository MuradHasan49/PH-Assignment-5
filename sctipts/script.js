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

function logout() {
    document.getElementById('login-section').classList.remove('hidden-section');
    document.getElementById('dashboard-section').classList.add('hidden-section');
    document.getElementById('loginForm').reset();
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

let togglebtn = (selectedBtn) => {
    console.log(selectedBtn)
    allbtn.forEach(btn => {
        btn.classList.remove("btn-primary")
        allDsiplay.forEach(all => all.classList.add('hidden'))
    })
    if (selectedBtn.innerText == 'Open') {
        openCard.classList.remove("hidden")
        status.innerText = `${openCard.childElementCount} Issues`
    } else if (selectedBtn.innerText == 'Closed') {
        closedCard.classList.remove("hidden")
        status.innerText = `${closedCard.childElementCount} Issues`
    } else if (selectedBtn.innerText == 'All') {
        outputContainer.classList.remove("hidden")
        status.innerText = `${outputContainer.childElementCount} Issues`
    }
    selectedBtn.classList.add("btn-primary")

}

let loadAllData = () => {
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

let displayContainer = (data) => {
    status.innerText = `${data.length} Issues`
    outputContainer.innerHTML = "";
    openCard.innerHTML = "";
    data.forEach(item => {
        const colorStatus = item.status.toUpperCase() == "OPEN" ? "border-green-600" : 'border-red-600'
        const priorityStatus = item.priority.toUpperCase() == 'MEDIUM' ? "bg-blue-50 text-blue-500" : item.priority.toUpperCase() == "LOW" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"

        let validation = item.status == 'open'
        let validation2 = item.status == 'closed'

        if (validation) {
            let opendiv = document.createElement('div')
            opendiv.innerHTML = `
            <div class="card w-full max-w-sm h-full bg-white shadow-md rounded-lg border-t-4  overflow-hidden ${colorStatus}">

                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="./assets/Open-Status.png" alt="">
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

                        <div class="border-t border-gray-100 p-5 bg-white">
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
                       <div class="card w-full max-w-sm h-full bg-white shadow-md rounded-lg border-t-4  overflow-hidden ${colorStatus}">

                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="./assets/Open-Status.png" alt="">
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

                        <div class="border-t border-gray-100 p-5 bg-white">
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
            <div class="card w-full max-w-sm h-full bg-white shadow-md rounded-lg border-t-4  overflow-hidden ${colorStatus}">

                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="./assets/Open-Status.png" alt="">
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

                        <div class="border-t border-gray-100 p-5 bg-white">
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
}

loadAllData()