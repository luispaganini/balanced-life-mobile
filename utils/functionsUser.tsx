export function calculateAge(birthDate: Date | string | null | undefined): string {
    if (!birthDate) return '';
    const dateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    if (isNaN(dateObj.getTime())) return '';
    
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const month = today.getMonth() - dateObj.getMonth();
  
    if (month < 0 || (month === 0 && today.getDate() < dateObj.getDate())) {
      age--;
    }
  
    return age.toString();
  }

  export function calculateBMI(weight: number, height: number): string {
    return (weight / (height * height)).toFixed(2);
  }