export function calculateAge(birthDate: Date): string {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
  
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age.toString();
  }

  export function calculateBMI(weight: number, height: number): string {
    return (weight / (height * height)).toFixed(2);
  }