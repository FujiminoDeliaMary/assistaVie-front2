import React from 'react';
import { useState } from 'react';

const MutiStepForm = () => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = ({
        mail : '',
        phone : '',
        name : '',
        surname : '',
        birthday : '',
        address : '',
        town : '',
        cp: '',
        password : '',
    })

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      // Fonction pour passer à l'étape suivante
      const nextStep = () => {
        setStep(step + 1);
      };
    
      // Fonction pour revenir à l'étape précédente (facultatif)
      const prevStep = () => {
        setStep(step - 1);
      };

      
  
      switch (step) {
        case 1:
          return (
            <div className="form-container">
              <h2>Étape 1 : Email et Téléphone</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleChange}
              />
              <button className="next-btn" onClick={nextStep}>
                Suivant
              </button>
            </div>
          );
        case 2:
          return (
            <div className="form-container">
              <h2>Étape 2 : Nom et Âge</h2>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Âge"
                value={formData.age}
                onChange={handleChange}
              />
              <button className="prev-btn" onClick={prevStep}>
                Précédent
              </button>
              <button className="next-btn" onClick={nextStep}>
                Suivant
              </button>
            </div>
          );
        case 3:
          return (
            <div className="form-container">
              <h2>Étape 3 : Adresse et Mot de passe</h2>
              <input
                type="text"
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="prev-btn" onClick={prevStep}>
                Précédent
              </button>
              <button className="next-btn" onClick={nextStep}>
                Terminer
              </button>
            </div>
          );
        case 4:
          return (
            <div className="form-container">
              <h2>Résumé des informations</h2>
              <p>Email : {formData.email}</p>
              <p>Téléphone : {formData.phone}</p>
              <p>Prénom : {formData.firstName}</p>
              <p>Nom : {formData.lastName}</p>
              <p>Âge : {formData.age}</p>
              <p>Adresse : {formData.address}</p>
              <p>Mot de passe : {formData.password}</p>
              <button className="prev-btn" onClick={prevStep}>
                Modifier
              </button>
              <button onClick={() => alert('Inscription réussie !')}>Confirmer</button>
            </div>
          );
        default:
          return null;
      }
    };


export default MutiStepForm