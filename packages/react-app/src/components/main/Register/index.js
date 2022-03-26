import React from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import CustomInput from "../../shared/CustomInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import CustomButton from "../../shared/CustomButton";
const Register = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(0);

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    const data = JSON.stringify({
      name: values.name,
      wallet: values.wallet,
      uid: values.uid,
    });
    console.log("Data", data);
    setSubmitting(false);
    resetForm();
    // history.push(`/user/${auth.userId}`);
  };
  return (
    <div>
      <BackgroundLayout />
      <div className="pt-[6rem] px-[2rem] flex justify-center items-center">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {tabsItems.map((item, index) => (
            <TabsComponent
              bg={openTab === index && true}
              name={item}
              onClick={() => setOpenTab(index)}
            />
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center pt-[2rem] ">
        <div className="w-[90%] md:w-[70%] lg:w-[50%] bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm p-4 rounded-lg">
          <Formik
            initialValues={{
              name: "",
              wallet: "x0as2930923018239",
              uid: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(4, "Must be atleast 4 characters")
                .max(100, "Cannot exceed 200 character")
                .required("Required"),
              uid: Yup.string().required("Required"),
            })}
            onSubmit={dataSubmitHandler}
          >
            {({ setFieldValue, ...props }) => (
              <Form>
                <CustomInput label="Name" name="name" placeholder="Name here" />
                <CustomInput
                  disabled={true}
                  label="Wallet"
                  name="wallet"
                  placeholder="Wallet ID"
                />
                <CustomInput
                  label="Unique ID"
                  name="uid"
                  placeholder="Tell us your unique id"
                />
                <div className="flex justify-center pt-[1.5rem]">
                  <CustomButton>
                    <p className="px-2 py-1 text-[20px]">Submit</p>
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const TabsComponent = (props) => {
  return (
    <li className=" mx-1 md:mx-6">
      <div
        onClick={props.onClick}
        className={`inline-block py-2 px-3 md:py-3 md:px-4 rounded-t-lg  hover:bg-[#0ac5a8]/80 dark:hover:bg-[#0ac5a8]/80 hover:text-gray-50 dark:hover:text-gray-800 text-[14px] md:text-[24px] cursor-pointer ${props.bg &&
          "bg-[#0ac5a8]/60 text-gray-700 dark:text-gray-200"}`}
      >
        {props.name}
      </div>
    </li>
  );
};

const tabsItems = ["Register as a Clinic", "Register as a Doctor"];

export default Register;
