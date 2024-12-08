export function formatDate(isoDate) {
    const date = new Date(isoDate);
    
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    // Formata a data para o PT-BR
    return date.toLocaleDateString('pt-BR', options);
}
export default formatDate;