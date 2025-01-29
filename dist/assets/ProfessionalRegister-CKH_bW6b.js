import{b as x,o as f,r as n,B as c,j as e,L as h,d as j}from"./index-D37etsNR.js";import{u as b}from"./formik.esm-CNVsjRGg.js";import{c as v,a}from"./index.esm-SBOtnemV.js";import{C as g}from"./Container-C8d1iS0q.js";import{R as k}from"./Row-BAPitWL4.js";import{C as E}from"./Col-B-y2eafv.js";import{F as s}from"./Form-DeiKwfmE.js";import{B as w}from"./Button-Bz3TyipB.js";import"./ThemeProvider-BlwJ0A3i.js";import"./index-Dr31eAbk.js";import"./Button-aIBXY-dk.js";function A(){const d=x(),[m,{isSuccess:l,isError:t,isLoading:y,error:p}]=f(),r=b({initialValues:{name:"",email:"",mobile:"",role:"",password:""},validationSchema:v({name:a().required("Enter name"),email:a().required("Enter email"),mobile:a().required("Enter mobile"),role:a().required("Enter role"),password:a().required("Enter password")}),onSubmit:(o,{resetForm:u})=>{m(o),u()}}),i=o=>j({"form-control my-2":!0,"is-invalid":r.touched[o]&&r.errors[o],"is-valid":r.touched[o]&&!r.errors[o]});return n.useEffect(()=>{l&&(d("/professional-login"),c.success("Professional Registration Success...!"))},[l]),n.useEffect(()=>{t&&c.warn(JSON.stringify(p,null,2),"Error")},[t]),e.jsx(g,{className:"mt-5",children:e.jsx(k,{className:"justify-content-center",children:e.jsxs(E,{md:6,children:[e.jsx("h2",{className:"text-center mb-5",children:"Professional Register"}),e.jsxs(s,{onSubmit:r.handleSubmit,children:[e.jsxs(s.Group,{controlId:"firstName",className:"mb-3",children:[e.jsx(s.Control,{type:"text",placeholder:"Enter your Name",class:i("name"),...r.getFieldProps("name"),name:"name",required:!0}),e.jsx("div",{class:"valid-feedback mt-3",children:"Looks good!"}),e.jsx("div",{class:"invalid-feedback",children:r.errors.name})]}),e.jsxs(s.Group,{controlId:"lastName",className:"mb-2",children:[e.jsx(s.Control,{type:"text",placeholder:"Enter your email",class:i("email"),...r.getFieldProps("email"),name:"email",required:!0}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"}),e.jsx("div",{class:"invalid-feedback",children:r.errors.email})]}),e.jsxs(s.Group,{controlId:"email",className:"mb-2",children:[e.jsx(s.Control,{type:"number",placeholder:"Enter your mobile",class:i("mobile"),...r.getFieldProps("mobile"),name:"mobile",required:!0}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"}),e.jsx("div",{class:"invalid-feedback",children:r.errors.mobile})]}),e.jsxs(s.Select,{class:i("role"),...r.getFieldProps("role"),"aria-label":"Select an option",children:[e.jsx("option",{value:"role",children:"Select Role"}),e.jsx("option",{value:"electriction",children:"electriction "}),e.jsx("option",{value:"plumber",children:"plumber "}),e.jsx("option",{value:"painter",children:"painter"})]}),e.jsxs(s.Group,{controlId:"password",className:"mt-2",children:[e.jsx(s.Control,{type:"password",placeholder:"Create a password",name:"password",class:i("password"),...r.getFieldProps("password"),required:!0}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"}),e.jsx("div",{class:"invalid-feedback",children:r.errors.password})]}),e.jsx(w,{variant:"primary",type:"submit",className:"w-100 mt-2",children:"Professional Register"}),e.jsxs("p",{class:"text-center mt-3",children:["Already Have Account? ",e.jsx(h,{to:"/professional-login",children:"Login"})]})]})]})})})}export{A as default};
