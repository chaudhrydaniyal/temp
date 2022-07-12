import React, { Component } from "react";
import SignUpForm from "./SignUpForm.js";
const axios = require("axios");
const FormValidators = require("./Validate");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        pwconfirm: "",
        image: "",
      },
      btnTxt: "show",
      type: "password",
      score: "0",
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.convertBase64 = this.convertBase64.bind(this);
  }

  async handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;

    if (field === "image") {
      user[field] = await this.uploadImage(event);

      console.log("state", this.state);

      this.setState({
        user,
      });

      return;
    }

    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });

    if (event.target.value === "") {
      this.setState((state) =>
        Object.assign({}, state, {
          score: "null",
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState((state) =>
        Object.assign({}, state, {
          score: pw.score + 1,
        })
      );
    }
  }

  submitSignup(user) {
    // var params = { username: user.usr, password: user.pw, email: user.email };
    console.log("user", user);
    axios
      .post("http://localhost:8000/auth/register", {
        fullname: user.fullname,
        username: user.usr,
        email: user.email,
        password: user.pw,
        image: user.image,
        isAdmin: false,
      })
      .then((res) => {
        if (res.data.success === true) {
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.reload();
        } else {
          this.setState({
            errors: { message: res.data.message },
          });
        }
      })
      .catch((err) => {
        console.log("Sign up data submit error: ", err);
      });
  }

  validateForm(event) {
    console.log("event", event);
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        fullname: this.state.user.fullname,
        usr: this.state.user.username,
        pw: this.state.user.password,
        email: this.state.user.email,
        image: this.state.user.image,
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors,
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);
    console.log("base64", base64);
    document.getElementById("avatar").src = `${base64}`;

    return base64;
    // avatar.src = base64;
    // textArea.innerText = base64;
  }

  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
          handleShow = {this.props.handleShow}
        />

       <div style={{paddingBottom:"200px",paddingTop:"33px"}}>
       <div className="registerText">
          <h4>Register Now, It’s Free!</h4>
          <br></br>
          <p>
            Post your properties on Zameen.com and directly expose them to
            thousands of potential investors, tenants, buyers, agents & brokers
            and other interested parties.<br></br><br></br> Save your favourite properties in your
            members panel to view them later at your convenience.<br></br><br></br>  Use
            Zameen.com's integrated e-mail facility to track your potential
            buying & rental leads.<br></br><br></br>  Set-up property email alerts providing you
            latest listings of properties instantly as they appear on
            Zameen.com.<br></br><br></br>  Search the exact kind of property you are looking for,
            including hundreds of developments, residential & commercial
            properties, homes, villas, apartments, plots, shops, offices,
            complete buildings & floors, warehouses, factories and labour camps.
          </p>{" "}
        </div>
       </div>
      </div>
    );
  }
}

export default SignUpContainer;
