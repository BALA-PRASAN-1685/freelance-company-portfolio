import { useEffect, useState } from 'react'
import './ContactPopup.css'


export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')


  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true)
    }, 10_000)


    return () => window.clearTimeout(timer)
  }, [])


  useEffect(() => {
    if (!isOpen) return


    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }


    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value


    // Allow only letters and spaces
    const filteredValue = value.replace(/[^A-Za-z ]/g, '')
    setName(filteredValue)
  }


  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value


    // Allow only numbers and maximum 10 digits
    const filteredValue = value.replace(/[^0-9]/g, '').slice(0, 10)
    setPhone(filteredValue)
  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const business = formData.get('business')
    const businessType = formData.get('businessType')
    const requirement = formData.get('requirement')


    const message = [
      'New Contact Form Submission:',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Business: ${business}`,
      `Business Type: ${businessType}`,
      `Requirement: ${requirement}`,
    ].join('\n')


    const whatsappUrl = `https://wa.me/918074961550?text=${encodeURIComponent(message)}`
    window.location.href = whatsappUrl
  }


  if (!isOpen) return null


  return (
    <div
      className="contact-popup__overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false)
      }}
    >
      <section
        className="contact-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
      >
        <button
          className="contact-popup__close"
          type="button"
          aria-label="Close contact form"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>


        <h2 className="contact-popup__title" id="contact-popup-title">
          Get in touch
        </h2>


        <form className="contact-popup__form" onSubmit={handleSubmit}>
          <div className="contact-popup__row">
            <div className="contact-popup__group">
              <label htmlFor="contact-popup-name">Your Name *</label>
              <input
                id="contact-popup-name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>


            <div className="contact-popup__group">
              <label htmlFor="contact-popup-email">Business Email ID *</label>
              <input
                id="contact-popup-email"
                name="email"
                type="email"
                required
                placeholder="Business Email ID"
              />
            </div>
          </div>


          <div className="contact-popup__row">
            <div className="contact-popup__group">
              <label htmlFor="contact-popup-phone">Mobile Number *</label>
              <input
                id="contact-popup-phone"
                name="phone"
                type="tel"
                required
                placeholder="Mobile Number"
                value={phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
                maxLength={10}
              />
            </div>


            <div className="contact-popup__group">
              <label htmlFor="contact-popup-business">Business Name *</label>
              <input
                id="contact-popup-business"
                name="business"
                type="text"
                required
                placeholder="Business Name"
              />
            </div>
          </div>


          <div className="contact-popup__row">
            <div className="contact-popup__group">
              <label htmlFor="contact-popup-business-type">Business type *</label>
              <select
                id="contact-popup-business-type"
                name="businessType"
                required
                defaultValue=""
              >
                <option value="" disabled>Select business type</option>
                <option>Start-up</option>
                <option>Small Business</option>
                <option>Enterprise</option>
                <option>Innovation</option>
              </select>
            </div>


            <div className="contact-popup__group">
              <label htmlFor="contact-popup-requirement">
                Tell us your Requirements *
              </label>
              <select
                id="contact-popup-requirement"
                name="requirement"
                required
                defaultValue=""
              >
                <option value="" disabled>Select a requirement</option>
                <option>Custom Software</option>
                <option>Collabration</option>
                <option>Mentoring</option>
              </select>
            </div>
          </div>


          <button className="contact-popup__submit" type="submit">
            Send
          </button>
        </form>
      </section>
    </div>
  )
}