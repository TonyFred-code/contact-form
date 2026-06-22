import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const successPopoverRef = useRef(null);
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      message: "",
      contactConsent: false,
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState;

  const onError = (errs) => {
    console.log("Form Error:", errs);
  };

  const onSubmit = async (data) => {
    console.log("form submitted", data);
    setShowSuccessToast(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    setShowSuccessToast(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("resetting form");
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (!successPopoverRef.current) return;

    const popoverElement = successPopoverRef.current;

    if (!popoverElement) return;

    if (showSuccessToast) {
      popoverElement.showPopover();
    } else {
      popoverElement.hidePopover();
    }
  }, [showSuccessToast]);

  return (
    <div className="min-h-screen bg-green-200 py-5 px-3">
      <main className="bg-white p-5 rounded-xl space-y-6">
        <h1 className="text-grey-900 text-3xl font-bold">
          Contact Us {isSubmitting ? "submitting" : "not"}
          {isDirty ? "dirty" : "not"}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="capitalize">
                first name <span className="text-green-900">*</span>
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                disabled={isSubmitting}
                className={`${errors.firstName ? "border-red" : "border-grey-500"} border rounded py-2 px-4 focus-visible:border-green-600 outline-none disabled:opacity-50 box-content`}
                id="firstName"
              />
              {errors.firstName && (
                <span className="text-red text-sm">
                  {errors.firstName?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="capitalize">
                last name <span className="text-green-900">*</span>
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                className={`${errors.lastName ? "border-red" : "border-grey-500"} border rounded py-2 px-4 focus-visible:border-green-600 outline-none box-content`}
                id="lastName"
              />
              {errors.lastName && (
                <span className="text-red text-sm">
                  {errors.lastName?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="capitalize">
              email address <span className="text-green-900">*</span>
            </label>
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
              className={`${errors.email ? "border-red" : "border-grey-500"} border rounded py-2 px-4 focus-visible:border-green-600 outline-none box-content`}
              id="email"
            />
            {errors.email && (
              <span className="text-red text-sm">{errors.email?.message}</span>
            )}
          </div>

          <fieldset className="flex flex-col gap-1">
            <legend className="capitalize mb-2">
              query type <span className="text-green-900">*</span>
            </legend>
            <div className="flex flex-col gap-2 lg:flex-row">
              <label className="flex items-center px-5 py-2 has-checked:bg-green-200 has-checked:border-green-600 gap-2 border-grey-500 border focus-within:border-green-600 has-focus-visible:border-green-600 rounded capitalize">
                <input
                  type="radio"
                  {...register("queryType", {
                    required: {
                      value: true,
                      message: "Please select a query type",
                    },
                  })}
                  className="accent-green-600 outline-none"
                  value={"general enquiry"}
                />
                <span>general enquiry</span>
              </label>

              <label className="flex items-center px-5 py-2 has-checked:bg-green-200 has-checked:border-green-600 gap-2 border-grey-500 border rounded capitalize">
                <input
                  type="radio"
                  {...register("queryType")}
                  value={"support request"}
                  className="accent-green-600 outline-none"
                />
                <span>support request</span>
              </label>
            </div>
            {errors.queryType && (
              <span className="text-red text-sm">
                {errors.queryType?.message}
              </span>
            )}
          </fieldset>

          <div>
            <label htmlFor="message" className="capitalize">
              message <span className="text-green-900">*</span>
            </label>
            <textarea
              {...register("message", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              className={`${errors.message ? "border-red" : "border-grey-500"} outline-none border w-full rounded-md py-2 px-4 text-grey-900 focus-visible:border-green-600 hover:border-green-600`}
              rows={3}
              id="message"
            ></textarea>
            {errors.message && (
              <span className="text-red text-sm">
                {errors.message?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex gap-3 items-center">
              <input
                type="checkbox"
                {...register("contactConsent", {
                  required: {
                    value: true,
                    message:
                      "To submit this form, please consent to being contacted",
                  },
                })}
                className="outline-none accent-green-600 size-5 align-middle"
              />
              <span>
                I consent to being contacted by the team{" "}
                <span className="text-green-900">*</span>
              </span>
            </label>
            {errors.contactConsent && (
              <span className="text-red text-sm">
                {errors.contactConsent?.message}
              </span>
            )}
          </div>
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              submit
            </button>
          </div>
        </form>
      </main>
      <div
        className="p-4 rounded bg-grey-900 text-white animate-fadeIn "
        popover="manual"
        id="success-popover"
        ref={successPopoverRef}
      >
        <p>Thanks for completing the form</p>
      </div>
    </div>
  );
}
