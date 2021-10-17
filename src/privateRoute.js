const { Route, Redirect } = require("react-router");

function PrivateRoute({auth,component: Component,...rest}) {
    console.log(rest)
    return(
        <Route {...rest} render={(props) => {
                console.log(auth)
                if(auth) return <Component {...props} />;
                if(!auth) return <Redirect to={"/login"}/>
            }
        } />
    )
}

export default PrivateRoute