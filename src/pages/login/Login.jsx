import { useEffect } from "react";
import s from "./Login.module.scss";
import { loginUser, resetUser } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      loginUser({
        username: data.get("username"),
        password: data.get("password"),
      })
    );
  };
  useEffect(() => {
    if (isAuthenticated) {
      router("/app/articles");
    }
  }, [isAuthenticated]);
  const resetPassword = () => {
    this.props.dispatch(
      resetUser({
        username: this.state.login,
      })
    );
  };
  return (
    <Grid container className={s.background}>
      <Grid item xs>
        &nbsp;
      </Grid>
      <Grid
        item
        sx={{
          marginTop: 28,
          width: 500,
          mr: 40,
          maxHeight: 500,
        }}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={"admin"}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              defaultValue={"123456"}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              loading={isFetching}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" onClick={resetPassword} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
// class Login extends React.Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool,
//     isFetching: PropTypes.bool,
//     location: PropTypes.any, // eslint-disable-line
//     errorMessage: PropTypes.string,
//   };

//   static defaultProps = {
//     isAuthenticated: false,
//     isFetching: false,
//     location: {},
//     errorMessage: null,
//   };

//   static isAuthenticated(token) {
//     // We check if app runs with backend mode
//     if (!config.isBackend && token) return true;
//     if (!token) return;
//     const date = new Date().getTime() / 1000;
//     const data = token;
//     return date < data.exp;
//   }

//   constructor(props) {
//     super(props);

//     this.state = {
//       login: "admin",
//       password: "123456",
//     };
//   }

//   changeLogin = (event) => {
//     this.setState({ login: event.target.value });
//   };

//   changePassword = (event) => {
//     this.setState({ password: event.target.value });
//   };
//   resetPassword = () => {
//     this.props.dispatch(
//       resetUser({
//         username: this.state.login,
//       })
//     );
//   };
//   doLogin = (e) => {
//     this.props.dispatch(
//       loginUser({
//         login: this.state.login,
//         password: this.state.password,
//       })
//     );
//     e.preventDefault();
//   };

//   render() {
//     const { from } = this.props.location.state || {
//       from: { pathname: "/app" },
//     };

//     if (this.props.isAuthenticated) {
//       return <Route path="*" element={<Navigate to={from} replace />} />;
//       // cant access login page while logged in
//     }

//     return (
//       <div className={s.root}>
//         <Row>
//           <Col
//             xs={{ size: 10, offset: 1 }}
//             sm={{ size: 6, offset: 3 }}
//             lg={{ size: 4, offset: 4 }}
//           >
//             <p className="text-center">React Dashboard</p>
//             <Widget className={s.widget}>
//               <h4 className="mt-0">Login to your Web App</h4>
//               <p className="fs-sm text-muted">
//                 User your username and password to sign in
//                 <br />
//                 Don&#39;t have an account? Sign up now!
//               </p>
//               <Form className="mt" onSubmit={this.doLogin}>
//                 {this.props.errorMessage && (
//                   <Alert size="sm" color="danger">
//                     {this.props.errorMessage}
//                   </Alert>
//                 )}
//                 <FormGroup className="form-group">
//                   <Input
//                     className="no-border"
//                     value={this.state.login}
//                     onChange={this.changeLogin}
//                     type="text"
//                     required
//                     name="username"
//                     placeholder="Username"
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input
//                     className="no-border"
//                     value={this.state.password}
//                     onChange={this.changePassword}
//                     type="password"
//                     required
//                     name="password"
//                     placeholder="Password"
//                   />
//                 </FormGroup>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <a href="#" onClick={this.resetPassword} className="fs-sm">
//                     Trouble with account?
//                   </a>{" "}
//                   {/* eslint-disable-line */}
//                   <div>
//                     <Button color="default" size="sm">
//                       Create an account
//                     </Button>
//                     <Button color="success" size="sm" type="submit">
//                       {this.props.isFetching ? "Loading..." : "Login"}
//                     </Button>
//                   </div>
//                 </div>
//               </Form>
//             </Widget>
//           </Col>
//         </Row>
//         <Footer className="text-center" />
//       </div>
//     );
//   }
// }

export default Login;
