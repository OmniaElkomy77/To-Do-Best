
import { StatusBar } from "react-native";
import themes from "../utiltes/Themes";
const Status_Bar = () => {
    return (
        <StatusBar backgroundColor={themes.primaryColor}
            barStyle={"light-content"}
        />
    )
}
export default Status_Bar;