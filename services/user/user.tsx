import IUserInterface from "@/interfaces/User/IUserInterface"
import api from "../api"
import IErrorInterface from "@/interfaces/App/IErrorInterface"
import ILinkPatientInterface from "@/interfaces/User/ILinkPatientInterface"

export async function patchUser(user: IUserInterface, idUser: number): Promise<IUserInterface | IErrorInterface> {
    const response = await api.patch(`/user/${idUser}`, user)
    if (response.status !== 200)
        return response.data

    return response.data
}

export async function resetPasswordGenerateCode(idUser: number) {
    const response = await api.post(`/password/reset-code/generate`, {
        idUser
    })
    
    return response
}

export async function verifyPasswordCode(verificationCode: string) {
    const response = await api.post(`/password/reset-code/verify`, {
        verificationCode
    })

    return response
}

export async function getNutritionistList() {
    const response = await api.get(`/user/nutritionists`)

    return response
}

export async function updateNutritionistLink(patientLink: ILinkPatientInterface) {
    const response = await api.put(`/user/patient`, patientLink)

    return response
}

export async function getNutritionistByLink() {
    const response = await api.get(`/user/nutritionist`)

    return response
}

export async function uploadProfilePicture(uri: string): Promise<{ url: string }> {
    const formData = new FormData();
    const filename = uri.split('/').pop() || 'profile.jpg';
    
    // Infer the type from the extension
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    formData.append('file', {
        uri: uri,
        name: filename,
        type: type,
    } as any);

    const response = await api.post('/upload/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export async function uploadMealPicture(mealId: number, uri: string): Promise<{ url: string }> {
    const formData = new FormData();
    const filename = uri.split('/').pop() || 'meal.jpg';
    
    // Infer the type from the extension
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    formData.append('file', {
        uri: uri,
        name: filename,
        type: type,
    } as any);

    const response = await api.post(`/upload/meal/${mealId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export async function getUser(idUser: number): Promise<IUserInterface> {
    const response = await api.get(`/user/${idUser}`);
    return response.data;
}