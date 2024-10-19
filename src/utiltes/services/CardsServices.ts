import axios from 'axios';
import { Domain } from "../Constant";
import APIS from '../Api';

const fetchCards = async (token: string, url: string = APIS.all_cards) => {
    try {
        const response = await axios.get(Domain + url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        const Allcards = response.data.data

        const sortedCards = Allcards.sort((a: any, b: any) => {
            if (a.status === "true" && b.status === "false") return 1;
            if (a.status === "false" && b.status === "true") return -1;
            return 0;
        });
        // console.log(sortedCards)

        return sortedCards;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching cards:', error.response?.data);
        }
        throw error;
    }
};

export default fetchCards;
