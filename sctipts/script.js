        console.log("wok")
        function handleLogin(event) {
            event.preventDefault();

            const username = document.getElementById('user').value;
            const password = document.getElementById('pass').value;

            if (username === 'admin' && password === 'admin123') {
                document.getElementById('login-section').classList.add('hidden-section');

                document.getElementById('dashboard-section').classList.remove('hidden-section');
            } else {
                alert("ভুল ইউজারনেম বা পাসওয়ার্ড! (Try admin & admin123)");
            }
        }

        function logout() {
            document.getElementById('login-section').classList.remove('hidden-section');
            document.getElementById('dashboard-section').classList.add('hidden-section');
            document.getElementById('loginForm').reset();
        }