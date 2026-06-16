import { useForm } from "react-hook-form";

export default function App() {
  const form = useForm({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    contactConsent: false,
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const onError = (errs) => {
    console.log("Form Error:", errs);
  };

  return (
    <div className="min-h-screen bg-green-200 py-5 px-3">
      <main className="bg-white p-5 rounded-xl">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">first name *</label>
            <input
              type="text"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              className="border border-green-600 rounded py-3 px-5 focus-visible:border-2 outline-none box-content"
              id="firstName"
            />
            {errors.firstName && <span>{errors.firstName?.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">last name *</label>
            <input
              type="text"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              className="border border-green-600 rounded py-3 px-5 focus-visible:border-2 outline-none box-content"
              id="lastName"
            />
            {errors.lastName && <span>{errors.lastName?.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">email address *</label>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="border border-green-600 rounded py-3 px-5 focus-visible:border-2 outline-none box-content"
              id="email"
            />
            {errors.email && <span>{errors.email?.message}</span>}
          </div>

          <fieldset>
            <legend>query type</legend>
            <div>
              <label>
                <input
                  type="radio"
                  {...register("queryType", {
                    required: {
                      value: true,
                      message: "Please select a query type",
                    },
                  })}
                  value={"general enquiry"}
                  id=""
                />
                <span>general enquiry</span>
              </label>

              <label>
                <input
                  type="radio"
                  {...register("queryType")}
                  value={"support request"}
                  id=""
                />
                <span>general enquiry</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="message">message *</label>
            <textarea
              {...register("message", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              id="message"
            ></textarea>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                {...register("contactConsent", {
                  required: {
                    value: true,
                    message:
                      "To submit this form, please consent to being contacted",
                  },
                })}
              />
              <span>
                I consent to being contacted by the team <span>*</span>
              </span>
            </label>
          </div>
          <div>
            <button disabled={!isDirty || !isValid} type="submit">
              submit
            </button>
          </div>
        </form>
      </main>
      <div></div>
      Last Name This field is required Email Address Please enter a valid email
      address This field is required Query Type General Enquiry Support Request
      Please select a query type Message This field is required I consent to
      being contacted by the team To submit this form, please consent to being
      contacted Submit Message Sent! Thanks for completing the form. We&apos;ll
      be in touch soon!
    </div>
  );
}
