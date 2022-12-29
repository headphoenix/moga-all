import { useState } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, addDoc, getDoc, admin } from "@firebase/firestore";
import { PaystackButton } from 'react-paystack'
import { nanoid } from 'nanoid';
import emailjs from '@emailjs/browser';
import { useRef, useId } from 'react';
import { customAlphabet } from 'nanoid';
import './form.styles.css'





const defaultFormFields = {
    name: "",
    maidenName: "",
    yearOfCompletion: "",
    house: "",
    title: "",
    dateOfBirth: "",
    telNumber: "",
    whatsappNumber: "",
    email: "",
    occupation: "",
    jobPosition: "",
    areaOfExperience: "",
    business: "",
    busName: "",
    busLogo: "",
    busProduct: "",
    busContact: "",
    busWebsite: "",
    mogaId: '',
    company: "",
};

const Form = () => {

    const publicKey = "pk_live_881b975d6fbcfb5f044347896b02af17de9109c5"
    const amount = 15000
    const currency = "GHS"

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name,
        maidenName,
        yearOfCompletion,
        house,
        title,
        dateOfBirth,
        telNumber,
        whatsappNumber,
        email,
        occupation,
        jobPosition,
        areaOfExperience,
        business,
        busName,
        busLogo,
        busProduct,
        busContact,
        busWebsite,
        mogaId,
        company, } = formFields;

    const nanoid = customAlphabet('1234567890')

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value, mogaId: `MOGA${yearOfCompletion}-${nanoid(4)}` });
    };

    // const mogaId = `MOGA${yearOfCompletigiton}-${nanoid()}`
    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };



    const form = useRef();

    const componentProps = {
        email,
        amount,
        currency,
        metadata: {
            name,
            telNumber,
        },
        publicKey,
        text: "Register",
        onSuccess: () => {
            const memberDetails = {
                name: name,
                maidenName: maidenName,
                yearOfCompletion: yearOfCompletion,
                house: house,
                title: title,
                dateOfBirth: dateOfBirth,
                telNumber: telNumber,
                whatsappNumber: whatsappNumber,
                email: email,
                occupation: occupation,
                jobPosition: jobPosition,
                areaOfExperience: areaOfExperience,
                business: business,
                busName: busName,
                busLogo: busLogo,
                busProduct: busProduct,
                busContact: busContact,
                busWebsite: busWebsite,
                company: company,
                mogaId: mogaId,
            }
            try {
                const docRef = addDoc(collection(db, "users"), memberDetails);
                console.log("Document written with ID: ", docRef.id);

                emailjs.sendForm('service_r5b6zar', 'template_gtcis15', form.current, 'i81xuBxQny_dCNZ8e')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
               // alert("Thanks for registering to MOGA!!");
                resetFormFields();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        onClose: () => alert("You've not registered yet"),
    }

    return (
        <div className='signup-form'>
            <form ref={form} >
                <div className='form-header'>
                    <h1>Mfantsiman Old Girls Association - 2023 Registration</h1>
                </div>
                <div className='form-body'>
                    <div className="horizontal-group">
                        <div className="form-group left">
                            <label className="label-title">
                                Full Name:
                            </label>
                            <input className="form-input" type="text" required name="name" value={name} onChange={handleChange} />
                        </div>
                        <div class="form-group right">
                            <label className="label-title">
                                Maiden Name:
                            </label>
                            <input className="form-input" type="text" name="maidenName" value={maidenName} onChange={handleChange} />
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">
                                    Year of Completion:
                                </label>
                                <input className='form-input' type="year" required name="yearOfCompletion" value={yearOfCompletion} onChange={handleChange} />
                            </div>
                            <input type="text" hidden name="mogaId" value={mogaId} />
                            <div class="form-group right">
                                <label className="label-title">
                                    House:
                                </label>
                                <select className="form-input" onChange={handleChange} name="house" value={house} required>
                                    <option value=""></option>
                                    <option value="Butler">Butler</option>
                                    <option value="Chinery">Chinery</option>
                                    <option value="Engmann">Engmann</option>
                                    <option value="Scotton">Scotton</option>
                                    <option value="Yeboah">Yeboah</option>
                                    <option value="Croffie">Croffie</option>
                                </select>
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">
                                    Title:
                                </label>
                                <select className='form-input' onChange={handleChange} name="title" value={title} required >
                                    <option value=""></option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Honourable">Honourable</option>
                                </select>
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Date of Birth: </label>
                                <input className='form-input' type="date" required name="dateOfBirth" value={dateOfBirth} onChange={handleChange} />
                            </div>
                            <div class="form-group right">
                                <label className="label-title">Telephone Number: </label>
                                <input className='form-input' type="tel" required name="telNumber" value={telNumber} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">WhatsApp Number:</label>
                                <input className='form-input' type="tel" required name="whatsappNumber" value={whatsappNumber} onChange={handleChange} />
                            </div>
                            <div class="form-group right">
                                <label className="label-title">Email Address:</label>
                                <input className='form-input' type="email" required name="email" value={email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Your Occupation:</label>
                                <input className='form-input' type="text" required name="occupation" value={occupation} onChange={handleChange} />
                            </div>
                            <div class="form-group right">
                                <label className="label-title">Your Job Position:</label>
                                <input className='form-input' type="text" required name="jobPosition" value={jobPosition} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Company: </label>
                                <input className='form-input' type="text" required name="company" value={company} onChange={handleChange} />
                            </div>
                            <div class="form-group right">
                                <label className="label-title">Area of Expertice: </label>
                                <input className='form-input' type="text" required name="areaOfExperience" value={areaOfExperience} onChange={handleChange} />
                            </div>
                        </div>

                        <div class="horizontal-group">
                            <div>
                                <label className="label-title">Do you own a business:</label>
                                <input
                                    type="radio"
                                    name="business"
                                    value="Yes"
                                    checked={business === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                                <input
                                    type="radio"
                                    name="business"
                                    value="No"
                                    checked={business === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <br />
                        </div>
                        <br />

                        {business === "Yes" && 
                            <div>
                            <h3>Kindly provide Details of your business</h3>
                            <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">
                                Name:
                                </label>
                                <input className='form-input' type="text" name="busName" value={busName} onChange={handleChange} />
                               </div>
                               <div class="form-group right">
                                <label className="label-title">
                                Logo and TagLine(optional):
                                </label>
                                <input className='form-input' type="text" name="busLogo" value={busLogo} onChange={handleChange} />
                                </div> 
                                </div>                         
                           
                                <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">
                                Products and Services: </label>
                                <input className='form-input' type="text" name="busProduct" value={busProduct} onChange={handleChange} />
                              </div>
                              <div class="form-group right">
                                <label className="label-title">
                                Contact Details: </label>
                                <input className='form-input' type="text" name="busContact" value={busContact} onChange={handleChange} />
                                </div>
                                </div>
                                <div className="horizontal-group">
                                <label className="label-title">
                                Website(optional): </label>
                               <input className='form-input' type="text" name="busWebsite" value={busWebsite} onChange={handleChange} />
                               </div>
                            </div>}
                    </div>
                </div>
                <p>
                    MOGA is committed to protecting the privacy of confidential information shared as much as possible. The information provided is used solely to keep record of our members and to help the MOGA operate efficiently to serve you better. We will only share information you provide with third parties in a manner permitted or required by law / DATA PROTECTION ACT,2012(ACT 843). Your personal data is kept secure. Only authorized members will have access to this information. If you have any questions or comments about this Privacy Statement, please reach us through MOGA NEC.
                </p> 

                <p>The Subscription fee for registering as a Moga Member is GHS 150.00</p>
            </form>
            <div className="form-footer">
                <PaystackButton className="btn" {...componentProps} />
            </div>
        </div>
    );
}

export default Form;