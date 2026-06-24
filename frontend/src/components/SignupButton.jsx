import { Link } from "react-router-dom";

function SignupButton() {

    return (
        <Link to="/signup">
            <button>
                Sign Up
            </button>
        </Link>
    );
}

export default SignupButton;