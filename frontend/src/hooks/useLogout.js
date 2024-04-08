
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from './useShowToast';
import {useNavigate} from "react-router-dom"

const useLogout = () => {
    const setUser = useRecoilState(userAtom)
    const showToast = useShowToast()
    const navigate = useNavigate()

    const logout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

            navigate("/auth")
			localStorage.removeItem("user-threads");
			setUser(null);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};
    return logout
}

export default useLogout