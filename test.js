let a = ["Murad", "hasan", "shuvo"];

let bugFunc = (arr) => {
    return arr.map(item => `<span>${item}</span>`).join(' ');
}

console.log(bugFunc(a));
// আউটপুট: "<span>Murad</span> <span>hasan</span> <span>shuvo</span>"  <div
                                    class="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1 rounded-full border border-red-100 text-xs font-bold">
                                    <i class="fa-solid fa-face-angry"></i> BUG
                                </div