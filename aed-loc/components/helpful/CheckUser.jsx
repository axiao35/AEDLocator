import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckUser(props) {
    const { user, setUser } = props;
    const token = localStorage.getItem("token");
    // let navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios
                .get("/api/users/me", config)
                .then((res) => {
                    setUser({
                        id: res.data.data._id,
                        username: res.data.data.username,
                        emergencyContact1: res.data.data.emergencyContact1,
                        emergencyContact2: res.data.data.emergencyContact2,
                        emergencyContact3: res.data.data.emergencyContact3,
                        trainingComplete: res.data.data.training,
                    });
                })
                .catch((err) => {
                    navigation.navigate("/login");
                });
        } else {
            navigation.navigate("/login");
        }
    }, []);

    return null;
}

export default CheckUser;