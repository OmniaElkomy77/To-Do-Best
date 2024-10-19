import axios from "axios";
import APIS from "../Api";
import { Domain } from "../Constant";
import { ICardAdd } from "../Type/Component";
const url = APIS.add_card
const AddCard = async (token: string, NewCard: ICardAdd) => {
    try {
        const response = await axios.post(Domain + url, NewCard, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {

        console.error("Error added card:", error);
        throw error; // re-throw the error after logging it
    }


}
export default AddCard;