import React from 'react';
import './RegisterForm.css';



const RegisterForm = () => {

    const registerForm = (event) => {
        event.preventDefault()
        
        const form = event.target;

        const registerDate ={
            studenName: form.studenName.value,
            email: form.email.value,
            number: form.number.value,
            fatherName: form.fatherName.value,
            motherName: form.motherName.value,
            permanent: form.permanent.value,
            present: form.present.value,
        };

        fetch(`https://register-server-1b37.vercel.app/postData`,{
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(registerDate)  
           })
           .then(res => res.json())
           .then(data => {
             if(data.acknowledged === true){
              event.target.reset("")
             }
             console.log(data)
           })
           .catch(e => console.log(e))

           console.log(registerDate)

    }


  return (
    <div>
      {/* headline */}
      <div className="registerForm-text-div">
        <h1 className="my-10">Register Form</h1>
      </div>

      {/* register form section */}
      <section>

        <form onSubmit={registerForm}>

          <div className="card w-full bg-base-100 shadow-xl">

            <div className="card-body">
               
               <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 gap-4">

                  <input name="studenName" type="text" placeholder="Your Full Name *" className="input input-bordered input-primary w-full" required/>

                  <input name="email" type="email" placeholder="Your Email *" className="input input-bordered input-primary w-full" required/>

                  <input name="number" type="number" placeholder="Your Contact Number *" className="input input-bordered input-primary w-full" required/>

               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-4 mt-6">

                  <input name="fatherName" type="text" placeholder="Your Father's Name *" className="input input-bordered input-primary w-full" required/>

                  <input name="motherName" type="text" placeholder="Your Mother's Name *" className="input input-bordered input-primary w-full" required/>

               </div>

               <div className="grid grid-cols-1 lg:grid xl:grid-cols-2 md:grid-cols-2 gap-4 my-5">

               <textarea name="permanent" className="textarea textarea-primary w-full" placeholder="Permanent Address *" required></textarea>

               <textarea name="present" className="textarea textarea-primary w-full" placeholder="Present Address (Optional)"></textarea>

               </div>

               <div>
                 <button type="submit" className="btn btn-primary text-white w-full font-bold text-xl">Submit</button>
               </div>

            </div>

          </div>

        </form>
        
      </section>
      <section>

        <form onSubmit={registerForm}>

          <div className="card w-full bg-base-100 shadow-xl">

            <div className="card-body">
               
               <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 gap-4">

                  <input name="studenName" type="text" placeholder="Your Full Name *" className="input input-bordered input-primary w-full" required/>

                  <input name="email" type="email" placeholder="Your Email *" className="input input-bordered input-primary w-full" required/>

                  <input name="number" type="number" placeholder="Your Contact Number *" className="input input-bordered input-primary w-full" required/>

               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-4 mt-6">

                  <input name="fatherName" type="text" placeholder="Your Father's Name *" className="input input-bordered input-primary w-full" required/>

                  <input name="motherName" type="text" placeholder="Your Mother's Name *" className="input input-bordered input-primary w-full" required/>

               </div>

               <div className="grid grid-cols-1 lg:grid xl:grid-cols-2 md:grid-cols-2 gap-4 my-5">

               <textarea name="permanent" className="textarea textarea-primary w-full" placeholder="Permanent Address *" required></textarea>

               <textarea name="present" className="textarea textarea-primary w-full" placeholder="Present Address (Optional)"></textarea>

               </div>

               <div>
                 <button type="submit" className="btn btn-primary text-white w-full font-bold text-xl">Submit</button>
               </div>

            </div>

          </div>

        </form>
        
      </section>

    </div>
  );
};

export default RegisterForm;