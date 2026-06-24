
function LoginButton() {
    
    return (
        
            <button
                onClick={() =>{
                    console.log("Cliked")
                    setShowLogin(true)
                }
                }
            >
                Login
            </button>
            

        
    );
}

export default LoginButton;