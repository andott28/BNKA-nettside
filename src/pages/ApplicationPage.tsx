import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationPage = ({ user }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanType: '',
    employmentStatus: '',
    monthlyIncome: '',
    globalIncome: '',
    jobOffer: '',
    education: '',
    residencyStatus: '',
    yearsInNorway: '',
    debt: '',
    paymentHistory: '',
    norwegianSkills: '',
    networkInNorway: '',
  });
  const [assessment, setAssessment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData(prev => ({
        ...prev,
        employmentStatus: '',
        monthlyIncome: '',
        globalIncome: '',
        jobOffer: '',
        education: '',
        residencyStatus: '',
        yearsInNorway: '',
        debt: '',
        paymentHistory: '',
        norwegianSkills: '',
        networkInNorway: '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        countryCode: user.countryCode || '+47',
      }));
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleLoanTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, loanType: type }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", formData); // Debugging line
      const payload = {
        navn: `${formData.firstName} ${formData.lastName}`,
        alder: 30, // You might want to add this to the form
        bosted: "Norway",
        jobbstatus: formData.employmentStatus,
        norsk_inntekt: parseFloat(formData.monthlyIncome) || 0,
        global_inntekt: parseFloat(formData.globalIncome) || 0,
        utdanning: formData.education,
        oppholdstid: formData.residencyStatus,
        gjeld: parseFloat(formData.debt) || 0,
        betalingshistorikk: formData.paymentHistory,
        språkkunnskaper: formData.norwegianSkills,
        nettverk_i_norge: formData.networkInNorway,
      };

      // Conditionally add jobOffer if employmentStatus !== "fast jobb" && formData.employmentStatus !== "egen bedrift"
      if (formData.employmentStatus !== "fast jobb" && formData.employmentStatus !== "egen bedrift") {
        payload["arbeidstilbud"] = formData.jobOffer;
      }

      const response = await fetch('http://localhost:3001/api/kredittvurdering', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Response status:", response.status); // Debugging line
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Assessment result:", result); // Debugging line
      setAssessment(result);
      nextStep();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Det oppstod en feil under behandlingen av søknaden. Vennligst prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmployed = formData.employmentStatus === "fast jobb" || formData.employmentStatus === "egen bedrift";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {num}
                  </div>
                  {num < 4 && (
                    <div
                      className={`h-1 w-16 md:w-32 ${
                        step > num ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Lånetype</span>
              <span className="text-xs">Personlig Info</span>
              <span className="text-xs">Økonomisk Info</span>
              <span className="text-xs">Gjennomgang</span>
            </div>
          </div>

          {/* Step 1: Loan Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Velg Din Lånetype</h2>
              <div className="flex space-x-4">
                <div
                  className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
                    formData.loanType === 'personal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handleLoanTypeSelect('personal')}
                >
                  Personlig Lån
                </div>
                <div
                  className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
                    formData.loanType === 'credit-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handleLoanTypeSelect('credit-card')}
                >
                  Kredittkort
                </div>
              </div>
              <button
                onClick={nextStep}
                disabled={!formData.loanType}
                className="ml-auto flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed mt-4"
              >
                Neste
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          )}

          {/* Step 3: Financial Information */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Økonomisk Informasjon</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ansettelsesstatus</label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  >
                    <option value="">Velg status</option>
                    <option value="fast jobb">Fast jobb</option>
                    <option value="egen bedrift">Egen bedrift</option>
                    <option value="deltid">Deltid</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Månedlig Inntekt i Norge (NOK)</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Global Månedlig Inntekt (NOK)</label>
                  <input
                    type="number"
                    name="globalIncome"
                    value={formData.globalIncome}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                    placeholder="0"
                  />
                </div>
                {!isEmployed && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Har du et jobbtilbud?</label>
                    <select
                      name="jobOffer"
                      value={formData.jobOffer}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                    >
                      <option value="">Velg alternativ</option>
                      <option value="ja">Ja</option>
                      <option value="nei">Nei</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Utdanningsnivå</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  >
                    <option value="">Velg utdanning</option>
                    <option value="ingen utdanning">Ingen formell utdanning</option>
                    <option value="videregående">Videregående</option>
                    <option value="bachelor">Bachelorgrad</option>
                    <option value="master">Mastergrad eller høyere</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tid i Norge</label>
                  <select
                    name="residencyStatus"
                    value={formData.residencyStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  >
                    <option value="">Velg tid</option>
                    <option value="6 mnd">6 mnd</option>
                    <option value="1 år">1 år</option>
                    <option value="3+ år">3+ år</option>
                    <option value="permanent">Permanent opphold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Gjeld (NOK)</label>
                  <input
                    type="number"
                    name="debt"
                    value={formData.debt}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Betalingshistorikk</label>
                  <select
                    name="paymentHistory"
                    value={formData.paymentHistory}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  >
                    <option value="">Velg historikk</option>
                    <option value="ingen forsinkelser">Ingen forsinkelser</option>
                    <option value="noen forsinkelser">Noen forsinkelser</option>
                    <option value="mange forsinkelser">Mange forsinkelser</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Norskkunnskaper</label>
                  <select
                    name="norwegianSkills"
                    value={formData.norwegianSkills}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  >
                    <option value="">Velg nivå</option>
                    <option value="ingen">Ingen</option>
                    <option value="litt">Grunnleggende</option>
                    <option value="flytende">Flytende</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nettverk i Norge</label>
                  <select
                    name="networkInNorway"
                    value={formData.networkInNorway}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  >
                    <option value="">Velg nettverk</option>
                    <option value="ingen">Ingen</option>
                    <option value="venner">Venner</option>
                    <option value="familie">Familie</option>
                    <option value="profesjonelt nettverk">Profesjonelt nettverk</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Forrige
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    !formData.employmentStatus ||
                    !formData.monthlyIncome ||
                    !formData.globalIncome ||
                    (!isEmployed && !formData.jobOffer) ||
                    !formData.education ||
                    !formData.residencyStatus ||
                    !formData.debt ||
                    !formData.paymentHistory ||
                    !formData.norwegianSkills ||
                    !formData.networkInNorway
                  }
                  className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Behandler...' : 'Send Søknad'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review and Assessment */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Kredittvurderingsresultater</h2>
              {assessment ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Lånegrad</h3>
                    <div className="flex items-center space-x-6">
                      <div className="text-3xl font-bold text-blue-600">
                        {assessment.loanGrade.grade}
                      </div>
                      <div>
                        <p className="font-medium">Godkjent Lånebeløp: {assessment.loanGrade.approvedLoan.toLocaleString()} NOK</p>
                        <p className="font-medium">Rentesats: {assessment.loanGrade.interestRate !== null ? `${assessment.loanGrade.interestRate}%` : 'Ikke kvalifisert'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Vurdering</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {assessment.assessment}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Behandler søknaden din...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
