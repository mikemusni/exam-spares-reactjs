export const localGet = (key: string) => {
    return localStorage.getItem(key) !== undefined ? JSON.parse(localStorage.getItem(key)) : false;
};

export const localSet = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const eject = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
};

export const authValidate = (apiRequestProfile, permission = []) => {
    const auth = localGet("auth");
    if (!auth) {
        eject();
    } else {
        if (permission.length >= 1) {
            if (!permission.includes(auth.permission)) {
                window.location.href = "/error/403";
                return;
            }
        } else {
            return apiRequestProfile().then((resp) => {
                const {status, response} = resp;
                if (!status) {
                    eject();
                }
                localSet("auth", response);
                return response;
            });
        }
    }
    return false;
};
