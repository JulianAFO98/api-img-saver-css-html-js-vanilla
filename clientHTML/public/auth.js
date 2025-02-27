export const getUserData = async () => {
    try {
        const request = await fetch("/api/auth/me");
        if (!request.ok) throw new Error("No autenticado");
        const userdata = await request.json();
        return userdata;
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error.message);
        return null;
    }
};



