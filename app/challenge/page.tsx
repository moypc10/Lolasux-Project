"use client"

//React
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

//Zod
import { zodResolver } from "@hookform/resolvers/zod";

//Schemas
import { PersonalInfo, PersonalInfoSchema} from "../../schemas/personal-info.schema";
import { Experience, ExperienceSchema } from "../../schemas/experience.schema";

//Components
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

//Logo
import logo from "@/components/assets/lolasux.png";
import Image from "next/image";

export default function ChallengePage() {

  //Steps for Multiform
  const [step, setStep] = useState(1);
  const prevStep = () => setStep((prev) => prev - 1);
  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["fullName", "email", "phone", "location", "portfolioUrl"]);
    } else if (step === 2) {
      isValid = await trigger(["currentRole", "yearsOfExperience", "skills", "company"]);
    }
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  //Schema Methods - Zod Resolver
  const combinedSchema = PersonalInfoSchema.merge(ExperienceSchema);
  const { handleSubmit, control, watch, formState: { errors }, trigger, reset, setValue
  } = useForm<PersonalInfo & Experience>({ 
    resolver: zodResolver(combinedSchema),
    defaultValues: {},
  });

  //Persist Information
  const formData = watch();
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof (PersonalInfo & Experience), parsedData[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  //Submit Data
  const onSubmit = (data: any) => {
    console.log("Form Data Submitted:", data); //Shows on Console
    reset(); //Reset Inputs
    setStep(1); //Gets Back to Step 1
    localStorage.removeItem("formData"); //Removes the localStorage Data
  };

  //Information for Progress Bar
  const getProgressPercentage = () => {
    if (step === 1) return 33;
    if (step === 2) return 66;
    return 100;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* -----Logo----- */}
      <Image 
        src={logo} 
        alt="Lolasux Logo" 
        width={200} 
        height={150} 
        className="mb-4 object-contain"
        style={{ width: "auto", height: "auto" }}
        priority
      />

      {/* -----Form----- */}
      <div className="max-w-lg w-full bg-white shadow-lime-600 border border-lime-600 p-8 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* -----Step 1 - Personal Information----- */}
            {step === 1 && (
              <>

                <h1 className="text-2xl font-bold mb-4 text-black">Personal Information</h1>
                {/* -----Full Name----- */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-black" htmlFor="name">
                    Full Name
                  </label>
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="fullName"
                        {...field}
                        className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                        required
                      />
                    )}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.fullName && <span>{errors.fullName.message}</span>}
                  </p>
                </div>
                
                {/* -----Email----- */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-black" htmlFor="email">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="email"
                        id="email"
                        {...field}
                        className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                        required
                      />
                    )}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.email && <span>{errors.email.message}</span>}
                  </p>
                </div>
                
                {/* -----Phone----- */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-black" htmlFor="phone">
                    Phone   <span className="italic text-gray-500">Example: +521234567890</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="tel"
                        id="phone"
                        {...field}
                        className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                        required
                      />
                    )}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.phone && <span>{errors.phone.message}</span>}
                  </p>
                </div>
                
                {/* -----Location----- */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-black" htmlFor="location">
                    Location
                  </label>
                  <Controller
                    name="location"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="location"
                        {...field}
                        className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                        required
                      />
                    )}
                  />

                  <p className="text-red-500 text-sm">
                    {errors.location && <span>{errors.location.message}</span>}
                  </p>
                </div>
                
                {/* -----Portfolio URL----- */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-black" htmlFor="portfolio">
                    Portfolio URL <span className="italic">(Optional)</span>
                  </label>
                  <Controller
                    name="portfolioUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="url"
                        id="portfolioUrl"
                        {...field}
                        className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                      />
                    )}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.portfolioUrl && <span>{errors.portfolioUrl.message}</span>}
                  </p>
                </div>
                
                {/* -----Next Button----- */}
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 rounded-lg font-medium transition"
                >
                  Next
                </button>
              </>
            )}

            {/* -----Step 2 - Experience----- */}
      {step === 2 && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-black">Experience</h1>
              {/* -----Current Role----- */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black" htmlFor="currentRole">
                  Current Role
                </label>
                <Controller
                  name="currentRole"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      id="currentRole"
                      {...field}
                      className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                      required
                    />
                  )}
                />
                <p className="text-red-500 text-sm">
                  {errors.currentRole && <span>{errors.currentRole.message}</span>}
                </p>
              </div>
              
              {/* -----Years of Experience----- */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black" htmlFor="yearsOfExperience">
                  Years of Experience
                </label>
                <Controller
                  name="yearsOfExperience"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      type="number"
                      id="yearsOfExperience"
                      {...field}
                      value={field.value || ''} // Ensure the value is a string for the input element
                      onChange={(e) => field.onChange(Number(e.target.value))} 
                      className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                      required
                    />
                  )}
                />
                <p className="text-red-500 text-sm">
                  {errors.yearsOfExperience && <span>{errors.yearsOfExperience.message}</span>}
                </p>
              </div>
                
              {/* -----Skills----- */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black" htmlFor="skills">
                  Skills <span className="text-gray-500 italic">Separate your skills by a Comma (",")</span>
                </label>
                <Controller
                  name="skills"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <input
                    type="text"
                    id="skills"
                    {...field}
                    onChange={(e) => {
                      const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
                      field.onChange(skillsArray);
                    }}
                    className={`w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600 ${errors.skills ? "border-red-500" : ""}`}
                  />
                  )}
                />

                <p className="text-red-500 text-sm">
                  {errors.skills && <span>{errors.skills.message}</span>}
                </p>
              </div>
              
              {/* -----Company----- */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black" htmlFor="company">
                  Company
                </label>
                <Controller
                  name="company"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      id="company"
                      {...field}
                      className="w-full p-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-lime-600"
                      required
                    />
                  )}
                />

                <p className="text-red-500 text-sm">
                  {errors.company && <span>{errors.company.message}</span>}
                </p>
              </div>
              
              {/* -----Previous & Next Button----- */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-lg font-medium transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        
        {/* -----Step 3 - Resume----- */}
        {step === 3 && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-black">Review your Information</h1>

              <div className="space-y-2 text-black">
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Location:</strong> {formData.location}</p>
                <p><strong>Portfolio:</strong> {formData.portfolioUrl}</p>
                <p><strong>Current Role:</strong> {formData.currentRole}</p>
                <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
                <p><strong>Skills:</strong> {formData.skills}</p>
                <p><strong>Company:</strong> {formData.company}</p>
              </div>

              {/* -----Previous & Submit Button----- */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition"
                >
                  Previous
                </button>
                

                {/* -----Dialog for Submit----- */}
                {/* <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition"
                >
                  Confirm & Submit
                </button> */}

                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition"
                  >
                    Submit
                  </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will sent your Personal Information and Experience to Lolasux
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onSubmit(formData); // Submit the data when the user confirms
                        }}
                      >
                        Confirm and Submit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          )}
        </form>
      </div>
    </main>
  );
}