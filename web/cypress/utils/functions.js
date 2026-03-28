import { faker } from '@faker-js/faker'

class Functions {

    getRandomDate = () => {
        const date = faker.date.birthdate({ min: 12, max: 100, mode: 'age' })
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Retorna a data no formato que o componente aceita digitar "05 Jan 1995"
        return `${day} ${month} ${year}`
    }

    getRandomHobbies = () => {
        const hobbies = ['Sports', 'Reading', 'Music']
        return hobbies[Math.floor(Math.random() * hobbies.length)]
    }

}

export default new Functions()
