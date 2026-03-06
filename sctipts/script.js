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


let togglebnt = () => {
    let allbtn = document.querySelectorAll(".btntoggle")
    allbtn.forEach(btn => {
        console.log(btn)
        btn.classList.remove("btn-primary")
        // btn.classList.add("btn-primary")
    })
}

let loadAllData = ()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(resultDate => displayContainer(resultDate.data))
}

let displayContainer =(data)=>{
    let outputContainer = document.getElementById("displayContainer")
    outputContainer.innerHTML="";
    data.forEach(item=>{
        console.log(item)
        let newDiv = document.createElement("div")
        newDiv.innerHTML = `
            <div class="card w-full max-w-sm bg-white shadow-md rounded-lg border-t-4 border-green-600 overflow-hidden">

                        <div class="p-5">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <img src="./assets/Open-Status.png" alt="">
                                </div>
                                <span
                                    class="bg-red-50 text-red-500 text-xs font-bold px-6 py-1.5 rounded-full tracking-wider">
                                    HIGH
                                </span>
                            </div>

                            <h2 class="text-xl font-bold text-slate-800 leading-tight mb-2">
                                Fix Navigation Menu On Mobile Devices
                            </h2>

                            <p class="text-slate-500 text-sm mb-6">
                                The navigation menu doesn't collapse properly on mobile devices...
                            </p>

                            <div class="flex gap-2 mb-6">
                                <div
                                    class="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1 rounded-full border border-red-100 text-xs font-bold">
                                    <i class="fa-solid fa-face-angry"></i> BUG
                                </div>
                                <div
                                    class="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full border border-yellow-100 text-xs font-bold uppercase tracking-tight">
                                    <i class="fa-solid fa-life-ring"></i> Help Wanted
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-100 p-5 bg-white">
                            <div class="flex flex-col gap-2 text-slate-500 text-sm">
                                <div class="flex items-center gap-2">
                                    <span class="font-medium text-slate-400">#1</span>
                                    <span>by <span class="font-semibold text-slate-600">john_doe</span></span>
                                </div>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="text-slate-400 font-medium tracking-wide">1/15/2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        outputContainer.appendChild(newDiv)
    })
}

loadAllData()