
const navIndex = document.getElementById("navbar-1")

const changeNavIfLogged = async () => {
    try {
        const request = await fetch("/api/auth/me");
        if (!request.ok) throw new Error("No autenticado");
        const userdata = await request.json();
        if (userdata.username) {
            navIndex.innerHTML = ` 
            <ul>
                <li class="nav-btn">
                    <a href="/" class="a-nav">Inicio</a>
                </li>
                <li class="nav-btn">
                    <a href="/upload" class="a-nav">Upload img</a>
                </li>
                <li id="profile-btn" class="nav-btn">
                    <a href="/profile" class="a-nav">${userdata.username}</a>
                </li>
            </ul>`;
        } else {
            throw new Error("No autenticado");
        }
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error.message);
        navIndex.innerHTML = ` 
        <ul>
            <li class="nav-btn">
                <a href="/login" class="a-nav">Login</a>
            </li>
            <li class="nav-btn">
                <a href="/register" class="a-nav">Register</a>
            </li>
        </ul>`;
    }
};






changeNavIfLogged();
